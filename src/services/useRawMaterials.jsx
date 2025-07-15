import useAxios from "../hooks/useAxios";
import {APIS} from "../api/apiUrls";

const useRawMaterials = () => {
  const api = useAxios();

  const getAllRawMaterials = () => {
    return api.get(`${APIS.raw_material}`);
  };

  const getRawMaterialFilterConfig = () => {
    return api.get(`${APIS.raw_material}/filter_config`);
  };

  const getRawMaterialById = (id) => {
    return api.get(`${APIS.raw_material}/${id}`);
  };

  const createRawMaterial = (data) => {
    return api.post(`${APIS.raw_material}`, data);
  };

  const updateRawMaterial = (id, data) => {
    return api.put(`${APIS.raw_material}/${id}`, data);
  };

  const deleteRawMaterial = (id) => {
    return api.delete(`${APIS.raw_material}/${id}`);
  };

  const getFilteredRawMaterials = (filters) => {
    return api.get(`${APIS.raw_material}/search`, {
      params: filters,
    });
  };

  const getRawMaterialsByClass = (
    class_type,
    {page = 1, limit = 10, search = "", type = "", name = ""} = {}
  ) => {
    return api.get(`${APIS.raw_material}/${class_type}`, {
      params: {page, limit, search, type, name},
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
    getRawMaterialFilterConfig,
  };
};

export default useRawMaterials;
