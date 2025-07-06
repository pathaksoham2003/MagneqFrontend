import useAxios from "../hooks/useAxios";
import {APIS} from "../api/apiUrls";

const useSales = () => {
  const api = useAxios();

  const createSale = (data) => {
    return api.post(`${APIS.sales}`, data);
  };

  const getAllSales = async (page,search) => {
    return await api.get(`${APIS.sales}?page_no=${page}&search=${search}`);
  };

  const getSaleById = (id) => {
    return api.get(`${APIS.sales}/${id}`);
  };

  const updateSale = (id, data) => {
    return api.put(`${APIS.sales}/${id}`, data);
  };

  const approaveSale = (id) => {
    return api.patch(`${APIS.sales}/${id}/approve`);
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
    approaveSale,
  };
};

export default useSales;
