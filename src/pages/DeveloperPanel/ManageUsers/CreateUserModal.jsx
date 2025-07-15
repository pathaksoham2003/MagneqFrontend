import React, { useState } from "react";
import Button from "../../../components/buttons/Button";

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    user_name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.role || !form.user_name || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await onUserCreated(form);
      setForm({ name: "", role: "", user_name: "", password: "" });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />
          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="input"
          />
          <input
            name="user_name"
            placeholder="Username"
            value={form.user_name}
            onChange={handleChange}
            className="input"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="input"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={loading}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
