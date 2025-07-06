import useAxios from "../hooks/useAxios";
import {APIS} from "../api/apiUrls";

const useRawMaterials = () => {
  const api = useAxios();

  /** Get all raw materials grouped by class_type */
  const getAllRawMaterials = () => {
    return api.get(`${APIS.raw_material}`);
  };

  /** Get raw material by ID */
  const getRawMaterialById = (id) => {
    return api.get(`${APIS.raw_material}/${id}`);
  };

  /** Create a new raw material */
  const createRawMaterial = (data) => {
    return api.post(`${APIS.raw_material}`, data);
  };

  /** Update raw material by ID */
  const updateRawMaterial = (id, data) => {
    return api.put(`${APIS.raw_material}/${id}`, data);
  };

  /** Delete raw material by ID */
  const deleteRawMaterial = (id) => {
    return api.delete(`${APIS.raw_material}/${id}`);
  };

  /** Get filtered raw materials based on class_type, type, model, product, or casting_product */
  const getFilteredRawMaterials = (filters) => {
    return api.get(`${APIS.raw_material}/search`, {
      params: filters,
    });
  };

  const getRawMaterialsByClass = (
    class_type,
    {page = 1, limit = 10, search = ""} = {}
  ) => {
    return api.get(`${APIS.raw_material}/${class_type}`, {
      params: {page, limit, search},
    });
  };

  return {
    getAllRawMaterials,
    getRawMaterialById,
    createRawMaterial,
    updateRawMaterial,
    deleteRawMaterial,
    getFilteredRawMaterials,
    getRawMaterialsByClass,
  };
};

export default useRawMaterials;
