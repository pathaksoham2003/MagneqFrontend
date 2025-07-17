import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import SuccessModal from "../../components/common/SuccessModal";
import useRawMaterials from "../../services/useRawMaterials";
import usePurchase from "../../services/usePurchase";
import POTable from "./POTable";
import {useMutation, useQueryClient} from "@tanstack/react-query";
const CreatePO = () => {
  const navigate = useNavigate();
  const { getRawMaterialFilterConfig, getFilteredRawMaterials } = useRawMaterials();
  const { createPurchaseOrder } = usePurchase();
  const queryClient = useQueryClient();
  const [classType, setClassType] = useState("A");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
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

  const {
        mutate: createPO,
        isPending,
        isSuccess,
        isError,
      } = useMutation({
        mutationFn: (order)=> createPurchaseOrder(order),
        onSuccess: () =>{
          queryClient.invalidateQueries({queryKey:["Purchases"]});
          setShowModal(true);
          setTableItems([]);
          setVendorName("");
          setPurchaseDate("");
          if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
          modalTimeoutRef.current = setTimeout(() => setShowModal(false), 4000);
        },
        onError:(err)=>{
          console.error("Order creation failed:", err);
          alert("Failed to create order. Please try again.");
        },
      });
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
    setSelectedTypes([]);

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
      getFilteredRawMaterials({ class_type: "B", type }).then((res) => {
        const names = (res?.data || res)?.map((rm) => rm.name).filter(Boolean);
        setNameOptions(names);
      });
    }
    if (classType === "B" && !type) {
      setNameOptions([]);
      setName("");
    }
  }, [classType, type]);

  useEffect(() => {
    if (classType === "C" && name) {
      getFilteredRawMaterials({ class_type: "C", name }).then((res) => {
        const types = Array.from(new Set((res?.data || res).map((rm) => rm.type).filter(Boolean)));
        setTypeOptions(types);
        setSelectedTypes([]); // Reset selected types
      });
    }
    if (classType === "C" && !name) {
      setTypeOptions([]);
      setSelectedTypes([]);
    }
  }, [classType, name]);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (classType === "A" && type && name) {
        const res = await getFilteredRawMaterials({ class_type: "A", type, name });
        const data = res?.data || res;
        setRawMaterialOptions(data);
        setSelectedRawMaterialId(data?.[0]?._id || "");
      } else if (classType === "B" && type && name) {
        const res = await getFilteredRawMaterials({ class_type: "B", type, name });
        const data = res?.data || res;
        setRawMaterialOptions(data);
        setSelectedRawMaterialId(data?.[0]?._id || "");
      } else if (classType === "C" && name && selectedTypes.length > 0) {
        try {
          const allResults = await Promise.all(
            selectedTypes.map((typeVal) =>
              getFilteredRawMaterials({ class_type: "C", name, type: typeVal })
            )
          );
          const merged = allResults.flat().map((res) => res?.data || res).flat();
          const unique = Array.from(new Map(merged.map((m) => [m._id, m])).values());

          setRawMaterialOptions(unique);
          setSelectedRawMaterialId(unique?.[0]?._id || "");
        } catch (err) {
          console.error("Failed to fetch materials for selected types", err);
        }
      } else {
        setRawMaterialOptions([]);
        setSelectedRawMaterialId("");
      }
    };

    fetchMaterials();
  }, [classType, type, name, selectedTypes]);

  const handleTypeToggle = (typeValue) => {
    setSelectedTypes((prev) =>
      prev.includes(typeValue)
        ? prev.filter((t) => t !== typeValue)
        : [...prev, typeValue]
    );
  };

  const handleAddItem = async () => {
  setError("");

  if (classType === "C") {
    if (!name || selectedTypes.length === 0) {
      setError("Please select a name and at least one type.");
      return;
    }

    try {
      const allMaterials = [];

      for (const type of selectedTypes) {
        const res = await getFilteredRawMaterials({
          class_type: "C",
          name,
          type,
        });

        const data = res?.data || res;
        allMaterials.push(...data);
      }

      if (allMaterials.length === 0) {
        setError("No materials found for the selected types.");
        return;
      }

      const newItems = allMaterials.map((material) => ({
        raw_material_id: material._id,
        name: material.name,
        class_type: material.class_type,
        type: material.type,
        quantity: 1, 
        price_per_unit: Number(price), 
        rawMaterial: material,
      }));

      setTableItems((prev) => [...prev, ...newItems]);
      setSelectedRawMaterialId("");
      setQuantity(1);
      setPrice("");
    } catch (err) {
      console.error("Error fetching raw materials for Class C:", err);
      setError("Failed to fetch materials. Please try again.");
    }
    return;
  }
  if (!selectedRawMaterialId || !quantity || !price) {
    setError("Please select a material, quantity, and price.");
    return;
  }

  const material = rawMaterialOptions.find(
    (m) => String(m._id) === String(selectedRawMaterialId)
  );

  if (!material) {
    setError("Selected material not found in options.");
    return;
  }

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

  setSelectedRawMaterialId("");
  setQuantity(1);
  setPrice("");
};


  const handleDelete = (idx) => {
    setTableItems((prev) => prev.filter((_, i) => i !== idx));
  };

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
      const payload = {
        vendor_name: vendorName,
        purchasing_date: purchaseDate,
        items: tableItems.map(({ raw_material_id, quantity, price_per_unit }) => ({
          raw_material_id,
          quantity,
          price_per_unit, 
        }))};
        createPO(payload);
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
            disabled
          >
            Upload CSV
          </Button>
        </div>

        {/* Vendor Info */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Vendor Name</label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
              placeholder="Enter vendor name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
            />
          </div>
        </div>

        {/* Material Form */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border"
              style={{background:"rgba(var(--background))"}}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          {(classType === "A" || classType === "B") && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  style={{background:"rgba(var(--background))"}}
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
                  style={{background:"rgba(var(--background))"}}
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
                <label className="block text-sm font-medium mb-1">Raw Material</label>
                <select
                  value={selectedRawMaterialId}
                  onChange={(e) => setSelectedRawMaterialId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-background "
                  disabled={rawMaterialOptions.length === 0}
                  style={{background:"rgba(var(--background))"}}
                >
                  <option className="bg-background text-text" value="">Select Raw Material</option>
                  {rawMaterialOptions.map((rm) => (
                    <option  key={rm._id} value={rm._id}>
                      {rm.name} ({rm.type})
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
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-background"
                >
                  <option value="">Select Name</option>
                  {nameOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-5">
                <label className="block text-sm font-medium mb-1 text-text">Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                  {typeOptions.map((t, idx) => (
                    <label key={t} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={t}
                        checked={selectedTypes.includes(t)}
                        onChange={() => handleTypeToggle(t)}
                        className="form-checkbox rounded bg-background"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
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
            <label className="block text-sm font-medium mb-1">Price per Unit</label>
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

        <div className="flex gap-4 mt-2">
          <Button type="button" size="md" variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
          <Button
            type="button"
            size="md"
            variant="success"
            onClick={handleCreatePO}
            disabled={tableItems.length === 0}
          >
            Create PO
          </Button>
        </div>

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
        <SuccessModal open={showModal} onClose={() => {setShowModal(false); navigate("/purchase")}} />
      </div>
    </div>
  );
};

export default CreatePO;
