import React, {useState, useEffect, useRef} from "react";
import Button from "../../components/buttons/Button";
import {BsFileEarmarkArrowUp} from "react-icons/bs";
import SuccessModal from "../../components/common/SuccessModal";
import useRawMaterials from "../../services/useRawMaterials";
import usePurchase from "../../services/usePurchase";
import POTable from "./POTable";

const CreatePO = () => {
  const {getRawMaterialFilterConfig, getFilteredRawMaterials} =
    useRawMaterials();
  const {createPurchaseOrder} = usePurchase();

  const [classType, setClassType] = useState("A");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [rawMaterialOptions, setRawMaterialOptions] = useState([]); 
  const [selectedRawMaterialId, setSelectedRawMaterialId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [tableItems, setTableItems] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [filterConfig, setFilterConfig] = useState(null);
  const modalTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await getRawMaterialFilterConfig();
      setFilterConfig(res?.data || res);
    };
    fetchConfig();
    return () => {
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setType("");
    setName("");
    setRawMaterialOptions([]);
    setSelectedRawMaterialId("");
    if (!filterConfig) return;
    if (classType === "A") {
      setTypeOptions(filterConfig.A.types || []);
      setNameOptions(filterConfig.A.names || []);
    } else if (classType === "B") {
      setTypeOptions(filterConfig.B.types || []);
      setNameOptions([]);
    } else if (classType === "C") {
      setNameOptions(filterConfig.C.names || []);
      setTypeOptions([]);
    }
  }, [classType, filterConfig]);

  useEffect(() => {
    if (classType === "B" && type) {
      getFilteredRawMaterials({class_type: "B", type}).then((res) => {
        const names = (res?.data || res)?.map((rm) => rm.name).filter(Boolean);
        setNameOptions(names);
      });
    }
    if (classType === "B" && !type) {
      setNameOptions([]);
      setName("");
    }
  }, [classType, type]);

  // For C: fetch types when name changes
  useEffect(() => {
    if (classType === "C" && name) {
      getFilteredRawMaterials({class_type: "C", name}).then((res) => {
        // Get all types, filter out falsy, deduplicate
        const types = Array.from(
          new Set((res?.data || res).map((rm) => rm.type).filter(Boolean))
        );
        setTypeOptions(types);
        setType(""); // Reset type when name changes
      });
    }
    if (classType === "C" && !name) {
      setTypeOptions([]);
      setType("");
    }
  }, [classType, name]);

  // Fetch raw material options for final selection (by class, type, name)
  useEffect(() => {
    let filters = {class_type: classType};
    if (classType === "A") {
      if (type) filters.type = type;
      if (name) filters.name = name;
    } else if (classType === "B") {
      if (type) filters.type = type;
      if (name) filters.name = name;
    } else if (classType === "C") {
      if (name) filters.name = name;
      if (type) filters.type = type;
    }
    // Only fetch if enough info is selected
    if (
      (classType === "A" && type && name) ||
      (classType === "B" && type && name) ||
      (classType === "C" && name && type)
    ) {
      getFilteredRawMaterials(filters).then((res) => {
        setRawMaterialOptions(res?.data || res);
        setSelectedRawMaterialId((res?.data || res)?.[0]?._id || "");
      });
    } else {
      setRawMaterialOptions([]);
      setSelectedRawMaterialId("");
    }
  }, [classType, type, name]);

  // Add item to PO table
  const handleAddItem = () => {
    setError("");
    if (!selectedRawMaterialId || !quantity || !price) {
      setError("Please select a material, quantity, and price.");
      return;
    }
    const material = rawMaterialOptions.find(
      (m) => m._id === selectedRawMaterialId
    );
    console.log(
      "Selected material:",
      material,
      "All options:",
      rawMaterialOptions,
      "Selected ID:",
      selectedRawMaterialId
    );
    if (!material) return;
    setTableItems((prev) => [
      ...prev,
      {
        raw_material_id: material._id,
        name: material.name,
        class_type: material.class_type,
        type: material.type,
        quantity: Number(quantity),
        price_per_unit: Number(price),
        rawMaterial: material,
      },
    ]);
    setSelectedRawMaterialId(rawMaterialOptions[0]?._id || "");
    setQuantity(1);
    setPrice("");
  };

  // Remove item from PO table
  const handleDelete = (idx) => {
    setTableItems((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit PO
  const handleCreatePO = async () => {
    setError("");
    if (!vendorName || !purchaseDate) {
      setError("Vendor name and purchase date are required.");
      return;
    }
    if (tableItems.length === 0) {
      setError("No items to create PO.");
      return;
    }
    try {
      await createPurchaseOrder({
        vendor_name: vendorName,
        purchasing_date: purchaseDate,
        items: tableItems.map(
          ({raw_material_id, quantity, price_per_unit}) => ({
            raw_material_id,
            quantity,
            price_per_unit,
          })
        ),
      });
      setShowModal(true);
      setTableItems([]);
      setVendorName("");
      setPurchaseDate("");
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = setTimeout(() => setShowModal(false), 4000);
    } catch {
      setError("Failed to create PO. Please try again.");
    }
  };

  return (
    <div className="w-full h-full items-center">
      <div className="p-8 w-full px-6 mx-auto mt-10 rounded-2xl shadow border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Purchase Order</h2>
          <Button
            type="button"
            size="md"
            variant="primary"
            startIcon={<BsFileEarmarkArrowUp />}
            className="shadow-theme-xs px-3"
          >
            Upload CSV
          </Button>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Vendor Name
            </label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
              placeholder="Enter vendor name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Purchase Date
            </label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          {classType === "A" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                >
                  <option value="">Select Name</option>
                  {nameOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {classType === "B" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  disabled={!type}
                >
                  <option value="">Select Name</option>
                  {nameOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {classType === "C" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                >
                  <option value="">Select Name</option>
                  {nameOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  disabled={!name}
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">
              Raw Material
            </label>
            <select
              value={selectedRawMaterialId}
              onChange={(e) => setSelectedRawMaterialId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
              disabled={rawMaterialOptions.length === 0}
            >
              <option value="">Select Raw Material</option>
              {rawMaterialOptions.map((rm) => (
                <option key={rm._id} value={rm._id}>
                  {rm.name} ({rm.type})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Price per Unit
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
              placeholder="Enter price"
            />
          </div>
        </div>
        <Button
          type="button"
          size="md"
          variant="primary"
          className="min-w-[130px] shadow-theme-xs mt-2"
          onClick={handleAddItem}
          disabled={!selectedRawMaterialId || !quantity || !price}
        >
          Add Item
        </Button>
        <Button
          type="button"
          size="md"
          variant="success"
          className="min-w-[130px] shadow-theme-xs mt-2 ml-4"
          onClick={handleCreatePO}
          disabled={tableItems.length === 0}
        >
          Create PO
        </Button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <POTable
          items={tableItems}
          getHeaders={() => [
            "Class",
            "Type",
            "Name",
            "Raw Material",
            "Quantity",
            "Price per Unit",
            "Delete",
          ]}
          onDelete={handleDelete}
        />
      </div>
      <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default CreatePO;
