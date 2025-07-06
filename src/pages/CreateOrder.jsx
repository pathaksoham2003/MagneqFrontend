import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrderNameInput from "../components/sales/OrderInputName";
import OrderItemsForm from "../components/sales/OrderItemsForm";
import Button from "../components/buttons/Button";
import useAxios from "../hooks/useAxios"; // your axios instance with interceptors
import useSales from "../services/useSales"

const CreateOrder = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "ADMIN";
  const {createSale} = useSales();
  const api = useAxios();
  const queryClient = useQueryClient();

  const [repName, setRepName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [ratio, setRatio] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  // Mutation for creating an order
  const {
    mutate: createOrder,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (orderPayload) => crea(orderPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // optional, for refetching
      alert("Order submitted successfully!");
      resetForm();
    },
    onError: (err) => {
      console.error("Order creation failed:", err);
      alert("Failed to create order. Please try again.");
    },
  });

  const resetForm = () => {
    setRepName("");
    setCustomerName("");
    setItems([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }

    const payload = {
      orderDate: new Date().toISOString(),
      createdBy: null, // Assuming you’ll use `user._id` or similar later
      executiveName: role === "ADMIN" ? "Pratik Agrawal" : repName,
      customerName,
      items,
    };

    createOrder(payload);
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
            disabled={items.length === 0 || isPending}
          >
            {isPending ? "Submitting..." : "Submit Order"}
          </Button>
        </div>
      </form>

      {isError && (
        <p className="text-red-600 mt-4">Error: {error?.response?.data?.message || error.message}</p>
      )}
      {isSuccess && <p className="text-green-600 mt-4">Order submitted successfully!</p>}
    </div>
  );
};

export default CreateOrder;
