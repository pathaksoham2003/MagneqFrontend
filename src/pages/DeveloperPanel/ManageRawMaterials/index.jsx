import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // add useNavigate
import { useQuery } from "@tanstack/react-query";
import Button from "../../../components/buttons/Button";
import DaynamicTable from "../../../components/common/Table";
import useRawMaterials from "../../../services/useRawMaterials";
import Select from "../../../components/forms/Select";
import Input from "../../../components/forms/Input";

const ManageRawMaterials = () => {
  const { class_type } = useParams();
  const navigate = useNavigate(); 
  const { getRawMaterialsByClass, getRawMaterialFilterConfig } = useRawMaterials();
  const [filters, setFilters] = useState({ search: "", type: "", name: "" });

  useEffect(() => {
    setFilters({ search: "", type: "", name: "" });
  }, [class_type]);

  const { data: filterConfig } = useQuery({
    queryKey: ["filter_config"],
    queryFn: getRawMaterialFilterConfig,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["raw_materials", class_type, filters],
    queryFn: () =>
      getRawMaterialsByClass(class_type, {
        search: filters.search,
        type: filters.type,
        name: filters.name,
      }),
    enabled: ["A", "B", "C"].includes(class_type),
  });

  // Instead of modal open, navigate to create page for the class
  const handleAddClick = () => {
    navigate(`/raw_material/${class_type}/create`);
  };

  const config = filterConfig?.[class_type] || {};

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Class {class_type} Materials</h1>
        <Button onClick={handleAddClick}>+ Add Raw Material</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search by name/type"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        {config.types && (
          <Select
            name="type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            {config.types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        )}

        {config.names && (
          <Select
            name="name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          >
            <option value="">All Names</option>
            {config.names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        )}
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DaynamicTable header={data?.header || []} tableData={data || { item: [] }} />
      )}
    </div>
  );
};

export default ManageRawMaterials;
