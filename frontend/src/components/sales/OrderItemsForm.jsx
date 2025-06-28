import React from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow } from "../common/Table";
import Select from "../forms/Select";
import Input from "../forms/Input";
import Button from '../buttons/Button';
import Badge from '../common/Badge';
import Label from '../forms/Label';
import { LuPencil } from "react-icons/lu";


const OrderItemsForm = ({
  items,
  setItems,
  model, setModel,
  type, setType,
  ratio, setRatio,
  quantity, setQuantity,
  description, setDescription,
  editingId, setEditingId,
  editedItem, setEditedItem
}) => {
  const handleAddItem = () => {
    if (!model || !type || !ratio || !quantity) {
      alert("Please fill all fields before adding item.");
      return;
    }

    const newItem = { id: Date.now(), model, type, ratio, quantity };
    setItems(prev => [...prev, newItem]);

    setModel('');
    setType('');
    setRatio('');
    setQuantity('');
    setDescription('');
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4 items-center mt-8">
        <div>
          <Label htmlFor="model" className="text-base font-medium">Model</Label>
          <Select name="model" value={model} onChange={(e) => setModel(e.target.value)} className="border-0 border-gray-600">
            <option value="">Select Model</option>
            <option value="MA-102">MA-102</option>
            <option value="MA-128">MA-128</option>
            <option value="MA-142">MA-142</option>
            <option value="MA-160">MA-160</option>
            <option value="MA-162">MA-162</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="type" className="text-base font-medium">Type</Label>
          <Select name="type" value={type} onChange={(e) => setType(e.target.value)} className="border-0 border-gray-600">
            <option value="">Select Type</option>
            <option value="Falange">Falange</option>
            <option value="Foot">Foot</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="ratio" className="text-base font-medium">Ratio</Label>
          <Select name="ratio" value={ratio} onChange={(e) => setRatio(e.target.value)} className="border-0 border-gray-600">
            <option value="">Select Ratio</option>
            <option value="Rate 1">Rate 1</option>
            <option value="Rate 2">Rate 2</option>
          </Select>
        </div>

        <div >
          <Label htmlFor="quantity" className="text-base font-medium">Quantity</Label>
          <Input
            name="quantity"
            placeholder="Enter quantity"
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-0 border-gray-600"
          />
        </div>
      </div>

      <div className="pt-6">
        <Badge variant="light" color="primary" size="sm" className="cursor hover:opacity-90 transition">
          <button type="button" onClick={handleAddItem}>+ Add Item</button>
        </Badge>
      </div>
        <div className="mt-5 p-2">
            <Label htmlFor="description" className="text-base font-medium ">Description</Label>
            <Input
                name="quantity"
                placeholder="Enter description"
                type="text"
                value={quantity}
                onChange={(e) => setDescription(e.target.value)}
                className="border-0 border-gray-600"
            />
      </div>

      {items.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-white/[0.05] bg-background mt-6 transition-colors">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-background border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {['Model', 'Type', 'Ratio', 'Quantity', 'Actions'].map((col) => (
                    <TableCell key={col} isHeader className="px-5 py-3 font-medium text-text text-start text-theme-xs">
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {items.map((item) => (
                  <TableRow key={item.id}>
                    {editingId === item.id ? (
                      <>
                        <TableCell className="px-5 py-3">
                          <Select value={editedItem.model} onChange={(e) => setEditedItem(prev => ({ ...prev, model: e.target.value }))}>
                            <option value="">Select Model</option>
                            <option value="MA-102">MA-102</option>
                            <option value="MA-128">MA-128</option>
                            <option value="MA-142">MA-142</option>
                            <option value="MA-160">MA-160</option>
                            <option value="MA-162">MA-162</option>
                          </Select>
                        </TableCell>
                        <TableCell className="px-5 py-3">
                          <Select value={editedItem.type} onChange={(e) => setEditedItem(prev => ({ ...prev, type: e.target.value }))}>
                            <option value="">Select Type</option>
                            <option value="Falange">Falange</option>
                            <option value="Foot">Foot</option>
                          </Select>
                        </TableCell>
                        <TableCell className="px-5 py-3">
                          <Select value={editedItem.ratio} onChange={(e) => setEditedItem(prev => ({ ...prev, ratio: e.target.value }))}>
                            <option value="">Select Ratio</option>
                            <option value="Rate 1">Rate 1</option>
                            <option value="Rate 2">Rate 2</option>
                          </Select>
                        </TableCell>
                        <TableCell className="px-5 py-3">
                          <Input value={editedItem.quantity} onChange={(e) => setEditedItem(prev => ({ ...prev, quantity: e.target.value }))} />
                        </TableCell>
                        <TableCell className="px-5 py-3 flex gap-2">
                            <Badge color="success">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => {
                                setItems(prev => prev.map(i => (i.id === item.id ? { ...item, ...editedItem } : i)));
                                setEditingId(null);
                                setEditedItem({});
                            }}
                            >Save</Button>
                            </Badge>
                            <Badge color="error">

                          <Button
                            size="sm"
                            variant="error"
                            onClick={() => {
                                setEditingId(null);
                                setEditedItem({});
                            }}
                            >Cancel</Button>
                            </Badge>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="px-5 py-3">{item.model}</TableCell>
                        <TableCell className="px-5 py-3">{item.type}</TableCell>
                        <TableCell className="px-5 py-3">{item.ratio}</TableCell>
                        <TableCell className="px-5 py-3">{item.quantity}</TableCell>
                        <TableCell className="px-5 py-3">
                          <Badge color="primary">
                            <button className="text-blue-400 bg-none flex gap-2" onClick={() => {
                              setEditingId(item.id);
                              setEditedItem(item);
                            }}> <LuPencil className="p-0.5 mt-0.5"/>Edit</button>
                          </Badge>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItemsForm;
