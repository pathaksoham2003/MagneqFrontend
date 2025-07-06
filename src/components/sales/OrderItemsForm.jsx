import React, {useEffect, useState} from "react";
import Select from "../forms/Select";
import Input from "../forms/Input";
import Badge from "../common/Badge";
import Label from "../forms/Label";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import useFinishedGoods from "../../services/useFinishedGoods";
import DaynamicTable from "../common/Table";
import {LuTrash} from "react-icons/lu";

const OrderItemsForm = ({
  items,
  setItems,
  model,
  setModel,
  type,
  setType,
  ratio,
  setRatio,
  quantity,
  setQuantity,
  power,
  setPower,
  ratePerUnit,
  setRatePerUnit,
}) => {
  const {getModalConfig} = useFinishedGoods();
  const {
    data: modelConfig,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["modalConfig"],
    queryFn: async () => {
      const data = await getModalConfig();
      Object.keys(data).forEach((modelKey) => {
        data[modelKey].powers = data[modelKey].powers.map(Number);
        const ratios = data[modelKey].ratios;
        const normalizedRatios = {};
        Object.keys(ratios).forEach((powerKey) => {
          normalizedRatios[powerKey.toString()] = ratios[powerKey];
        });
        data[modelKey].ratios = normalizedRatios;
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const [availablePowers, setAvailablePowers] = useState([]);
  const [availableRatios, setAvailableRatios] = useState([]);

  useEffect(() => {
    if (model && modelConfig?.[model]) {
      setAvailablePowers(modelConfig[model].powers);
    } else {
      setAvailablePowers([]);
    }
    setPower("");
    setRatio("");
  }, [model, modelConfig, setPower, setRatio]);

  useEffect(() => {
    if (
      model &&
      power &&
      modelConfig?.[model]?.ratios &&
      modelConfig[model].ratios[power.toString()]
    ) {
      setAvailableRatios(modelConfig[model].ratios[power.toString()]);
    } else {
      setAvailableRatios([]);
    }
    setRatio("");
  }, [power, model, modelConfig, setRatio]);

  const handleAddItem = () => {
    if (!model || !type || !ratio || !quantity || !power || !ratePerUnit) {
      alert("Please fill all fields before adding item.");
      return;
    }

    const newItem = {
      id: Date.now(),
      model,
      type,
      ratio,
      quantity: parseFloat(quantity),
      power: parseFloat(power),
      rate_per_unit: parseFloat(ratePerUnit),
    };

    setItems((prev) => [...prev, newItem]);

    setModel("");
    setType("");
    setRatio("");
    setQuantity("");
    setPower("");
    setRatePerUnit("");
  };

  if (isLoading) return <p>Loading form config...</p>;
  if (isError) return <p>Error loading form config</p>;

  return (
    <>
      <div className="grid grid-cols-6 gap-4 items-center mt-8">
        <div>
          <Label htmlFor="model">Model</Label>
          <Select
            name="model"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              setPower("");
              setRatio("");
            }}
          >
            <option value="">Select Model</option>
            {Object.keys(modelConfig || {}).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="power">Power</Label>
          <Select
            name="power"
            value={power}
            onChange={(e) => {
              setPower(e.target.value);
              setRatio("");
            }}
            disabled={!availablePowers.length}
          >
            <option value="">Select Power</option>
            {availablePowers.map((p) => (
              <option key={p} value={p.toString()}>
                {p}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="ratio">Ratio</Label>
          <Select
            name="ratio"
            value={ratio}
            onChange={(e) => setRatio(e.target.value)}
            disabled={!availableRatios.length}
          >
            <option value="">Select Ratio</option>
            {availableRatios.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="B">Base</option>
            <option value="V">Vertical</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="rate_per_unit">Rate / Unit</Label>
          <Input
            name="rate_per_unit"
            type="number"
            value={ratePerUnit}
            onChange={(e) => setRatePerUnit(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-6">
        <Badge variant="light" color="primary" size="sm">
          <button type="button" onClick={handleAddItem}>
            + Add Item
          </button>
        </Badge>
      </div>

      {items.length > 0 && (
        <div className="mt-6">
          <DaynamicTable
            header={[
              "Model",
              "Power",
              "Ratio",
              "Type",
              "Quantity",
              "Rate",
              "Actions",
            ]}
            tableData={{
              item: items.map((item) => ({
                id: item.id,
                data: [
                  item.model,
                  item.power,
                  item.ratio,
                  item.type,
                  item.quantity,
                  item.rate_per_unit,
                  <Badge color="primary" key={item.id}>
                    <button
                      className="text-red-400 flex gap-2"
                      onClick={() =>
                        setItems((prev) => prev.filter((i) => i.id !== item.id))
                      }
                    >
                      <LuTrash className="p-0.5 mt-0.5" />
                      Delete
                    </button>
                  </Badge>,
                ],
              })),
            }}
          />
        </div>
      )}
    </>
  );
};

export default OrderItemsForm;
