import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import useFinishedGoods from "../../../services/useFinishedGoods";
import Input from "../../../components/forms/Input";
import Button from "../../../components/buttons/Button";

const CreateFinishedGood = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {createFinishedGood} = useFinishedGoods();

  const [form, setForm] = useState({
    model: "",
    power: "",
    type: "",
    ratio: "",
    motor_shaft_diameter: "",
    motor_frame_size: "",
    rpm: "",
    nm: "",
    sf: "",
    base_price:"",
    overhead_load: "",
  });

  const mutation = useMutation({
    mutationFn: (data) => createFinishedGood(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["finishedGoods"]);
      toast.success("Finished good created successfully.");
      navigate("/finished_good");
    },
    onError: (err) => {
      toast.error("Error creating finished good: " + err.message);
    },
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = () => {
    const {
      model,
      power,
      type,
      ratio,
      base_price,
      motor_shaft_diameter,
      motor_frame_size,
      rpm,
      nm,
      sf,
      overhead_load,
    } = form;

    if (!model || !power || !type || !ratio) {
      toast.error("Model, Power, Type and Ratio are required.");
      return;
    }

    const payload = {
      model,
      power,
      type,
      ratio,
      base_price,
      other_specification: {
        motor_shaft_diameter,
        motor_frame_size,
        rpm,
        nm,
        sf,
        overhead_load,
      },
    };

    mutation.mutate(payload);
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">Create Finished Good</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Model</label>
          <Input name="model" value={form.model} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm font-medium">Power</label>
          <Input name="power" value={form.power} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm font-medium">Ratio</label>
          <Input name="ratio" value={form.ratio} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="Base (Foot)">Base (Foot)</option>
            <option value="Vertical (Flange)">Vertical (Flange)</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Motor Shaft Diameter</label>
          <Input
            name="motor_shaft_diameter"
            value={form.motor_shaft_diameter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Motor Frame Size</label>
          <Input
            name="motor_frame_size"
            value={form.motor_frame_size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium">RPM</label>
          <Input name="rpm" value={form.rpm} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm font-medium">Nm</label>
          <Input name="nm" value={form.nm} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm font-medium">SF</label>
          <Input name="sf" value={form.sf} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm font-medium">Overhead Load</label>
          <Input
            name="overhead_load"
            value={form.overhead_load}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Base Price</label>
          <Input name="base_price" value={form.base_price} onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={mutation.isLoading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateFinishedGood;
