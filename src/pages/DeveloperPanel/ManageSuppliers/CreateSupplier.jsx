import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../../components/buttons/Button";
import useManage from "../../../services/useManage";
import Input from "../../../components/forms/Input";
import { useQueryClient } from "@tanstack/react-query";

const CreateSupplier = () => {
  const [form, setForm] = useState({
    name: "",
    role: "SUPPLIER",
    user_name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {createUser} = useManage();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.user_name || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await createUser(form);
      queryClient.invalidateQueries({ queryKey:["SUPPLIER"]});
      navigate("/manage_suppliers");
    } catch (err) {
      setError(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Supplier</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="user_name"
            placeholder="Username"
            value={form.user_name}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="lg"
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading} disabled={loading}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSupplier;
