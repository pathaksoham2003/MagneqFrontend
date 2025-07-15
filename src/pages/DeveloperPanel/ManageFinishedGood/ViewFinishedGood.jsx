import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Button from "../../../components/buttons/Button";
import useFinishedGoods from "../../../services/useFinishedGoods";
import useRawMaterials from "../../../services/useRawMaterials";
import DaynamicTable from "../../../components/common/Table";
import {useQuery} from "@tanstack/react-query";
import Input from "../../../components/forms/Input";

const ViewFinishedGood = () => {
  const {id} = useParams();
  const {getFinishedGoodById, updateFinishedGood} = useFinishedGoods();
  const {getFilteredRawMaterials} = useRawMaterials();

  const {data, isLoading} = useQuery({
    queryKey: ["finishedGoodById", id],
    queryFn: () => getFinishedGoodById(id),
    enabled: !!id,
  });

  const [finishedGood, setFinishedGood] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    classA: "",
    classB: "",
    classC: "",
  });
  const [searchResults, setSearchResults] = useState({
    classA: [],
    classB: [],
    classC: [],
  });
  const [editingData, setEditingData] = useState({
    classA: [],
    classB: [],
    classC: [],
  });

  useEffect(() => {
    if (data) {
      setFinishedGood(data);
      setEditingData({
        classA: data.classA || [],
        classB: data.classB || [],
        classC: data.classC || [],
      });
    }
  }, [data]);

  const mapToTable = (arr) => {
    if (!arr || !Array.isArray(arr)) return {header: [], item: []};
    return {
      header: ["Name", "Type", "Quantity"],
      item: arr.map(({raw_material, quantity}) => ({
        id: raw_material._id,
        data: [raw_material.name, raw_material.type, quantity],
      })),
    };
  };

  const handleDelete = (classType, id) => {
    setEditingData((prev) => ({
      ...prev,
      [classType]: prev[classType].filter(
        (item) => item.raw_material._id !== id
      ),
    }));
  };

  const handleQuantityChange = (classType, id, newQty) => {
    setEditingData((prev) => ({
      ...prev,
      [classType]: prev[classType].map((item) =>
        item.raw_material._id === id ? {...item, quantity: newQty} : item
      ),
    }));
  };

  const handleAddRawMaterial = async (classType) => {
    try {
      const response = await getFilteredRawMaterials({
        search: searchTerm[classType],
      });
      setSearchResults((prev) => ({...prev, [classType]: response}));
    } catch (err) {
      console.error("Search error", err);
      setSearchResults((prev) => ({...prev, [classType]: []}));
    }
  };

  const handleSelectSearchItem = (classType, item) => {
    if (!editingData[classType].find((r) => r.raw_material._id === item._id)) {
      setEditingData((prev) => ({
        ...prev,
        [classType]: [...prev[classType], {raw_material: item, quantity: 1}],
      }));
    }
    setSearchTerm((prev) => ({...prev, [classType]: ""}));
    setSearchResults((prev) => ({...prev, [classType]: []}));
  };

  const handleSave = async () => {
    try {
      await updateFinishedGood(id, {
        classA: editingData.classA.map((item) => ({
          raw_material: item.raw_material._id,
          quantity: item.quantity,
        })),
        classB: editingData.classB.map((item) => ({
          raw_material: item.raw_material._id,
          quantity: item.quantity,
        })),
        classC: editingData.classC.map((item) => ({
          raw_material: item.raw_material._id,
          quantity: item.quantity,
        })),
      });
      alert("Finished Good updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (isLoading || !finishedGood)
    return <p className="p-4">Loading Finished Good...</p>;

  const renderEditor = (classType) => (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        Class {classType} Raw Materials
      </h3>
      <div className="space-y-2">
        {editingData[classType].map(({raw_material, quantity}) => (
          <div
            key={raw_material._id}
            className="flex items-center gap-2 border p-2 rounded"
          >
            <span className="flex-1">{raw_material.name}</span>
            <span>{raw_material.type}</span>
            <Input
              type="number"
              className="w-20"
              value={quantity}
              onChange={(e) =>
                handleQuantityChange(
                  classType,
                  raw_material._id,
                  +e.target.value
                )
              }
            />
            <Button onClick={() => handleDelete(classType, raw_material._id)}>
              Delete
            </Button>
          </div>
        ))}

        <Input
          placeholder={`Search Raw Material for Class ${classType}`}
          value={searchTerm[classType]}
          onChange={(e) =>
            setSearchTerm((prev) => ({...prev, [classType]: e.target.value}))
          }
        />
        <Button onClick={() => handleAddRawMaterial(classType)}>
          Search & Add
        </Button>

        {searchResults[classType].length > 0 && (
          <div className="border p-2 mt-2 space-y-1 max-h-48 overflow-y-auto">
            {searchResults[classType].map((rm) => (
              <div
                key={rm._id}
                className="cursor-pointer hover:bg-gray-100 p-1"
                onClick={() => handleSelectSearchItem(classType, rm)}
              >
                {rm.name} — {rm.type}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const headHeader = [
    "Model Number",
    "Model",
    "Type",
    "Power",
    "Ratio",
    "Motor Shaft Diameter",
    "Motor Frame Size",
    "RPM",
    "Nm",
    "SF",
    "Overhead Load",
  ];

  const headData = {
    header: headHeader,
    item: [
      {
        id: finishedGood.model_number,
        data: [
          finishedGood.model_number,
          finishedGood.model,
          finishedGood.type,
          finishedGood.power,
          finishedGood.ratio,
          finishedGood.motor_shaft_diameter,
          finishedGood.motor_frame_size,
          finishedGood.rpm,
          finishedGood.nm,
          finishedGood.sf,
          finishedGood.overhead_load,
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Finished Good Details</h2>

      <DaynamicTable header={headData.header} tableData={headData} />

      <div className="grid grid-cols-3 gap-8">
        {isEditing ? (
          <>
            {renderEditor("classA")}
            {renderEditor("classB")}
            {renderEditor("classC")}
          </>
        ) : (
          <>
            {finishedGood.classA?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Class A Raw Materials
                </h3>
                <DaynamicTable
                  header={["Name", "Type", "Quantity"]}
                  tableData={mapToTable(finishedGood.classA)}
                />
              </div>
            )}

            {finishedGood.classB?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Class B Raw Materials
                </h3>
                <DaynamicTable
                  header={["Name", "Type", "Quantity"]}
                  tableData={mapToTable(finishedGood.classB)}
                />
              </div>
            )}

            {finishedGood.classC?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Class C Raw Materials
                </h3>
                <DaynamicTable
                  header={["Name", "Type", "Quantity"]}
                  tableData={mapToTable(finishedGood.classC)}
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-end mt-6 gap-4">
        {isEditing ? (
          <>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Raw Materials</Button>
        )}
      </div>
    </div>
  );
};

export default ViewFinishedGood;
