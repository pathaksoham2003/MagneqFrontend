import useAxios from "../hooks/useAxios";
import { APIS } from "../api/apiUrls";

const useProduction = () => {
  const api = useAxios();

  const getPendingProductions = () => {
    return api.get(`${APIS.production}`);
  };

  const getProductionById = (id) => {
    return api.get(`${APIS.production}/${id}`);
  };

  const startProductionById = (id) => {
    return api.post(`${APIS.production}/${id}/start`);
  };

  const markAsReady = (id) => {
    return api.put(`${APIS.production}/${id}/ready`);
  };

  return {
    getPendingProductions,
    getProductionById,
    startProductionById,
    markAsReady,
  };
};

export default useProduction;
