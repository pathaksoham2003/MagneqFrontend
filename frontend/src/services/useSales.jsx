import useAxios from "../hooks/useAxios";
import { APIS } from "../api/apiUrls";

const useSales = () => {
  const api = useAxios();

  const createSale = (data) => {
    return api.post(`${APIS.sales}`, data);
  };

  const getAllSales = () => {
    return api.get(`${APIS.sales}`);
  };

  const getSaleById = (id) => {
    return api.get(`${APIS.sales}/${id}`);
  };

  const updateSale = (id, data) => {
    return api.put(`${APIS.sales}/${id}`, data);
  };

  const deleteSale = (id) => {
    return api.delete(`${APIS.sales}/${id}`);
  };

  return {
    createSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
  };
};

export default useSales;
