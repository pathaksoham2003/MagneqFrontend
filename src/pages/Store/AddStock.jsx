import React, { useState } from "react";
import Button from "../../components/buttons/Button";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/table/Table";
import SuccessModal from "../../components/common/SuccessModal"

const INITIAL_ITEM_LIST = Array.from({ length: 24 }, (_, i) => `Item ${i + 1}`);

const AddStock = () => {
  const [items, setItems] = useState([
    {
      class: "A", 
      product: "",
      status: "",
      specification: "others",
      quantity: 1,
    },
  ]);
  const [tableItems, setTableItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cQuantity, setCQuantity] = useState(1);
  const [cSpecification, setCSpecification] = useState("others");
  const [itemList, setItemList] = useState(INITIAL_ITEM_LIST);
  const modalTimeoutRef = React.useRef(null);


  const handleCheckboxChange = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };


  const handleAddCClassStock = (e) => {
    e.preventDefault();
    if (!items[0].class || selectedItems.length === 0 || !cQuantity) return;
    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const newRows = selectedItems.map((item) => ({
      class: items[0].class,
      item,
      date: dateStr,
      quantity: cQuantity,
    }));
    setTableItems([...tableItems, ...newRows]);
    setSelectedItems([]);
    setCQuantity(1);
    setShowModal(true);
    if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    modalTimeoutRef.current = setTimeout(() => setShowModal(false), 4000);
  };

  const handleAddMoreItems = () => {
    if (items[0].class === "C") {
      setItemList([...itemList, `Item ${itemList.length + 1}`]);
    } else {
      setItems([
        ...items,
        {
          class: "A",
          product: "",
          status: "",
          specification: "others",
          quantity: 1,
        },
      ]);
    }
  };

  const handleChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const handleAddToTable = (e) => {
    e.preventDefault();
    const validItems = items.filter(
      (item) => item.class && item.product && item.quantity > 0
    );
    if (validItems.length === 0) return;
    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const itemsWithDate = validItems.map((item) => ({
      ...item,
      date: dateStr,
      item: item.product,
    }));
    setTableItems([...tableItems, ...itemsWithDate]);
    setItems([
      {
        class: "A",
        product: "",
        status: "",
        specification: "others",
        quantity: 1,
      },
    ]);
    setShowModal(true);
    if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    modalTimeoutRef.current = setTimeout(() => setShowModal(false), 4000);
  };

  const handleDelete = (idx) => {
    setTableItems(tableItems.filter((_, i) => i !== idx));
  };

  React.useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };
  }, []);


  const getTableHeaders = () => {
    if (items[0].class === "B") {
      return ["CLASS", "Product", "Date of Stock Entry", "Quantity", "Status", "Delete"];
    }
  
    return ["CLASS", "Item", "Date of Stock Entry", "Quantity", "Delete"];
  };

  return (
    <div className="w-full h-full items-center">
      <div
        className="p-8 w-full px-6 mx-auto mt-10 rounded-2xl shadow border"
        style={{
          background: "rgba(var(--background))",
          borderColor: "rgba(var(--border))",
          color: "rgba(var(--text))",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add Stock</h2>
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

        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Class</label>
              <select
                value={items[0].class}
                onChange={(e) => handleChange(0, "class", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{
                  background: "rgba(var(--background))",
                  color: "rgba(var(--text))",
                  border: "1px solid rgba(var(--border))",
                  borderRadius: "0.5rem",
                }}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          {items[0].class === "C" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Other Specification</label>
                  <select
                    value={cSpecification}
                    onChange={e => setCSpecification(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg"
                    style={{
                      background: "rgba(var(--background))",
                      color: "rgba(var(--text))",
                      border: "1px solid rgba(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <option value="others">others</option>
                    <option value="spec1">Specification 1</option>
                    <option value="spec2">Specification 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={cQuantity}
                    onChange={e => setCQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg"
                    style={{
                      background: "rgba(var(--background))",
                      color: "rgba(var(--text))",
                      border: "1px solid rgba(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Item</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {itemList.map((item, idx) => (
                    <div key={item} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`item-${idx}`}
                        checked={selectedItems.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                        className="mr-2"
                      />
                      <label htmlFor={`item-${idx}`}>{item}</label>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddMoreItems}
                className="text-sm text-blue-600 font-medium flex items-center gap-1 bg-blue-100 rounded-lg px-3 mb-2"
              >
                <IoIosAddCircleOutline className="text-lg " />
                Add more Items
              </button>
              <div className="mt-6 flex gap-4">
                <Button
                  type="button"
                  size="md"
                  variant="primary"
                  className="min-w-[130px] shadow-theme-xs "
                  onClick={handleAddCClassStock}
                  disabled={selectedItems.length === 0 || !cQuantity}
                >
                  Add Stock
                </Button>
              </div>
            </>
          ) : (
            <>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  {index !== 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Class</label>
                      <select
                        value={item.class}
                        onChange={(e) => handleChange(index, "class", e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg"
                        style={{
                          background: "rgba(var(--background))",
                          color: "rgba(var(--text))",
                          border: "1px solid rgba(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                  )}

                  {item.class === "A" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Casting Product</label>
                        <select
                          value={item.product}
                          onChange={(e) => handleChange(index, "product", e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg"
                          style={{
                            background: "rgba(var(--background))",
                            color: "rgba(var(--text))",
                            border: "1px solid rgba(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <option value="">Select Product</option>
                          <option value="Mohan Kumar">Mohan Kumar</option>
                          <option value="Product 2">Product 2</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Other Specification</label>
                        <select
                          value={item.specification}
                          onChange={(e) => handleChange(index, "specification", e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg"
                          style={{
                            background: "rgba(var(--background))",
                            color: "rgba(var(--text))",
                            border: "1px solid rgba(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <option value="others">others</option>
                          <option value="spec1">Specification 1</option>
                          <option value="spec2">Specification 2</option>
                        </select>
                      </div>
                    </>
                  )}

                  {item.class === "B" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Product</label>
                        <select
                          value={item.product}
                          onChange={(e) => handleChange(index, "product", e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg"
                          style={{
                            background: "rgba(var(--background))",
                            color: "rgba(var(--text))",
                            border: "1px solid rgba(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <option value="">Select Product</option>
                          <option value="Product 1">Product 1</option>
                          <option value="Product 2">Product 2</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                          value={item.status}
                          onChange={(e) => handleChange(index, "status", e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg"
                          style={{
                            background: "rgba(var(--background))",
                            color: "rgba(var(--text))",
                            border: "1px solid rgba(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <option value="">Select Status</option>
                          <option value="Processing">Processing</option>
                          <option value="Hobbing">Hobbing</option>
                          <option value="HT">HT</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleChange(index, "quantity", e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg"
                      style={{
                        background: "rgba(var(--background))",
                        color: "rgba(var(--text))",
                        border: "1px solid rgba(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMoreItems}
                className="text-sm text-blue-600 font-medium flex items-center gap-1 bg-blue-100 rounded-lg px-3 mb-2"
              >
                <IoIosAddCircleOutline className="text-lg " />
                Add more Items
              </button>
              <div className="mt-6 flex gap-4">
                <Button
                  type="button"
                  size="md"
                  variant="primary"
                  className="min-w-[130px] shadow-theme-xs "
                  onClick={handleAddToTable}
                  disabled={items.length === 0 || items.every(item => !item.class || !item.product || !item.quantity)}
                >
                  Add Stock
                </Button>
              </div>
            </>
          )}
        </div>

    
        <div className="mt-10 rounded-2xl overflow-hidden border"
          style={{
            background: "rgba(var(--background))",
            color: "rgba(var(--text))",
            borderColor: "rgba(var(--border))",
          }}
        >
          <Table className="text-sm text-left w-full">
            <TableHeader>
              <TableRow>
                {getTableHeaders().map((header, idx) => (
                  <TableCell
                    key={header}
                    isHeader
                    className="px-6 py-4 font-medium"
                    style={{ color: "rgba(var(--text))", borderBottom: "none" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {tableItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={getTableHeaders().length} className="text-center py-6 text-gray-400">No items added yet.</TableCell>
                </TableRow>
              ) : (
                tableItems.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-6 py-2">{row.class}</TableCell>
                    <TableCell className="px-6 py-2">{row.item}</TableCell>
                    <TableCell className="px-6 py-2">{row.date}</TableCell>
                    <TableCell className="px-6 py-2">{row.quantity}</TableCell>
                    {items[0].class === "B" && (
                      <TableCell className="px-6 py-2">{row.status || ""}</TableCell>
                    )}
                    <TableCell className="px-6 py-2">
                      <button
                        className="text-red-500 bg-red-100 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                        onClick={() => handleDelete(index)}
                      >
                        <span className="text-[14px]">🖉</span> Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <SuccessModal open={showModal} onClose={() => setShowModal(false)} />

     
    </div>
  );
};

export default AddStock;
