import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import useRawMaterials from "../../../services/useRawMaterials";
import { useMutation } from "@tanstack/react-query";

const CreateRawMaterial = () => {
  const { class_type } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [specs, setSpecs] = useState([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const { createRawMaterial } = useRawMaterials();

  useEffect(() => {
    setName("");
    setType("");
    setSpecs([]);
    setNewKey("");
    setNewValue("");
  }, [class_type]);

  const handleAddSpec = () => {
    if (!newKey || !newValue) return;
    setSpecs([...specs, { key: newKey, value: newValue }]);
    setNewKey("");
    setNewValue("");
  };

  const handleRemoveSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const { mutate: createMutation, isLoading } = useMutation({
    mutationFn: createRawMaterial,
    onSuccess: () => {
      alert("Raw Material Created!");
      navigate(`/raw_material/${class_type}`);
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Creation failed: " + (error?.response?.data?.error || "Unknown error"));
    },
  });

  const handleSubmit = () => {
    if (!name || !type) {
      alert("Name and Type are required.");
      return;
    }

    const quantity = specs.reduce((acc, curr) => {
      if (curr.key) acc[curr.key] = curr.value;
      return acc;
    }, {});

    const payload = {
      class_type,
      name,
      type,
      quantity,
    };

    createMutation(payload); // trigger backend mutation
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">Create Raw Material (Class {class_type})</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border-b border-gray-300 px-3 py-2 outline-none focus:border-brand-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <input
            className="w-full border-b border-gray-300 px-3 py-2 outline-none focus:border-brand-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3">Specifications (Key - Value)</h3>

          <div className="flex gap-4 mb-4">
            <input
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="flex-1 border-b border-gray-300 px-3 py-1 outline-none"
            />
            <input
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1 border-b border-gray-300 px-3 py-1 outline-none"
            />
            <Button className="px-2" size="sm" onClick={handleAddSpec}>
              + Add
            </Button>
          </div>

          {specs.length === 0 ? (
            <p className="text-sm text-gray-400">No specifications added.</p>
          ) : (
            <div className="space-y-2">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <input
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                    className="flex-1 border-b border-gray-200 px-3 py-2 outline-none"
                    placeholder="Key"
                  />
                  <input
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                    className="flex-1 border-b border-gray-200 px-3 py-2 outline-none"
                    placeholder="Value"
                  />
                  <Button size="sm" variant="outline" onClick={() => handleRemoveSpec(idx)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default CreateRawMaterial;
