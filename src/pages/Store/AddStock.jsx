import React, { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePurchase from "../../services/usePurchase";
import Button from "../../components/buttons/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/table/Table";
import SuccessModal from "../../components/common/SuccessModal";
import { BsFileEarmarkArrowUp } from "react-icons/bs";

const AddStock = () => {
  const [selectedPO, setSelectedPO] = useState({ id: "", po_number: "" });
  const [selectedClass, setSelectedClass] = useState("");
  const [materialInputs, setMaterialInputs] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalTimeoutRef = useRef(null);
  const queryClient = useQueryClient();

  const {
    getAllPurchaseOrders,
    getPurchaseOrderItems,
    addStockToPurchaseOrder,
  } = usePurchase();

  const { data: purchases } = useQuery({
    queryKey: ["Purchases"],
    queryFn: getAllPurchaseOrders,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: itemData,
    refetch,
  } = useQuery({
    queryKey: ["POItems", selectedPO.po_number, selectedClass],
    queryFn: () => getPurchaseOrderItems(selectedPO.po_number, selectedClass),
    enabled: !!selectedPO.po_number && !!selectedClass,
    staleTime: 5 * 60 * 1000,
  });

  const {
    mutate: submitStock,
  } = useMutation({
    mutationFn: (stockData) => addStockToPurchaseOrder(stockData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rawMaterials"] });
      queryClient.invalidateQueries({ queryKey: ["POItems", selectedPO.po_number, selectedClass] });
      setShowModal(true);
      setTableItems([]);
      setSelectedPO({ id: "", po_number: "" });
      setSelectedClass("");
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = setTimeout(() => setShowModal(false), 4000);
    },
    onError: (err) => {
      console.error("Stock submission failed:", err);
      alert("Failed to submit stock. Please try again.");
    },
  });

  const handleQuantityChange = (id, qty) => {
    setMaterialInputs((prev) =>
      prev.map((m) => (m.item_id === id ? { ...m, recieved_quantity: qty } : m))
    );
  };

  const handleAddItem = () => {
    const valid = materialInputs.filter((i) => i.recieved_quantity > 0);
    setTableItems([...tableItems, ...valid]);
    setMaterialInputs([]);
  };

  const handleSubmit = () => {
    const payload = {
      po_id: selectedPO.id,
      items: tableItems.map((item) => ({
        item_id: item.item_id,
        recieved_quantity: item.recieved_quantity,
      })),
    };
    console.log(payload);
    submitStock(payload);
  };

  useEffect(() => {
    if (itemData?.items) {
      const enriched = itemData.items.map((item) => ({
        ...item,
        recieved_quantity: 0,
      }));
      setMaterialInputs(enriched);
    }
  }, [itemData]);

  return (
    <div className="p-8 w-full px-6 mx-auto mt-10 rounded-2xl shadow border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Add Stock</h2>
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

      {/* Select PO */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select PO</label>
          <select
            className="w-full px-3 py-2 text-sm rounded-lg border"
            value={JSON.stringify(selectedPO)}
            onChange={(e) => {
              const po = JSON.parse(e.target.value);
              setSelectedPO(po);
              setSelectedClass("");
              setTableItems([]);
            }}
          >
            <option value="">Select Purchase Order --</option>
            {purchases?.item?.map((po) => {
              const poNumber = po.data[0]?.replace("PRO-", "");
              return (
                <option key={po.id} value={JSON.stringify({ id: po.id, po_number: poNumber })}>
                  {po.data[0]} - {po.data[1]}
                </option>
              );
            })}
          </select>
        </div>

        {selectedPO.po_number && (
          <div>
            <label className="block text-sm font-medium mb-1">Select Class</label>
            <select
              className="w-full px-3 py-2 text-sm rounded-lg border"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">-- Select Class --</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        )}
      </div>

      {/* Materials Input */}
      {materialInputs.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Materials</h4>
          {materialInputs.map((item) => (
            <div key={item.item_id} className="flex items-center gap-4 mb-2">
              <div className="w-1/4">
                <span className="block text-sm font-medium text-text">{item.name}</span>
                <span className="block text-xs text-muted-foreground">{item.type}</span>
              </div>
              <input
                type="number"
                min="0"
                max={item.max_allowed}
                value={item.recieved_quantity}
                onChange={(e) => handleQuantityChange(item.item_id, Number(e.target.value))}
                className="border px-3 py-1 rounded w-1/4"
              />
              <span className="text-xs text-gray-500">Max: {item.max_allowed}</span>
            </div>
          ))}
          <Button
            onClick={handleAddItem}
            className="mt-2"
            disabled={materialInputs.every((i) => i.recieved_quantity <= 0)}
          >
            Add Items to Table
          </Button>
        </div>
      )}

      {/* Table */}
      {tableItems.length > 0 && (
        <div className="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Material</TableCell>
                <TableCell isHeader>Type</TableCell>
                <TableCell isHeader>Quantity</TableCell>
                <TableCell isHeader>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableItems.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">{row.name}</div>
                      <div className="text-xs text-muted-foreground">{row.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.recieved_quantity}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        setTableItems((prev) => prev.filter((_, i) => i !== idx))
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="primary"
            className="mt-4"
            onClick={handleSubmit}
          >
            Submit Stock
          </Button>
        </div>
      )}

      <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AddStock;
