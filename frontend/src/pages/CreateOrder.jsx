import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderNameInput from "../components/sales/OrderInputName";
import OrderItemsForm from "../components/sales/OrderItemsForm";
import  Button  from "../components/buttons/Button";
import axios from "axios";

const CreateOrder = () => {
//   const user = useSelector((state) => state.auth.user) ; // use when we login properly

  const [repName, setRepName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [ratio, setRatio] = useState('');
  const [quantity, setQuantity] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  const role = "Executive"; // use role = user?.role || "ADMIN"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Please add at least one item before submitting.');
      return;
    }

    const payload = {
      orderDate: new Date().toISOString(),
      createdBy:  null,
      executiveName: role === "ADMIN" ? "Pratik Agrawal" : repName,
      customerName,
      items,
    };

    try {
        console.log(payload);
      const response = await axios.post('/api/orders', payload);
      console.log('Order created:', response.data);
      alert('Order submitted successfully!');

      setRepName('');
      setCustomerName('');
      setItems([]);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="grid gap-4 md:gap-6 bg-background text-text p-15 md:p-15 rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold text-text">Create Order</h1>

      <OrderNameInput
        repName={repName}
        setRepName={setRepName}
        customerName={customerName}
        setCustomerName={setCustomerName}
      />

      <form onSubmit={handleSubmit}>
        <OrderItemsForm
          items={items}
          setItems={setItems}
          model={model}
          setModel={setModel}
          type={type}
          setType={setType}
          ratio={ratio}
          setRatio={setRatio}
          quantity={quantity}
          setQuantity={setQuantity}
          description={description}
          setDescription={setDescription}
          editingId={editingId}
          setEditingId={setEditingId}
          editedItem={editedItem}
          setEditedItem={setEditedItem}
        />

        <div className="mt-6">
          <Button
            type="submit"
            size="xl"
            variant="primary"
            className="p-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={items.length === 0}
          >
            Submit Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
