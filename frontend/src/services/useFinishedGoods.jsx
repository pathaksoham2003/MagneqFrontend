import useAxios from "../hooks/useAxios";
import { APIS } from "../api/apiUrls";

const useFinishedGoods = () => {
  const api = useAxios();

  const createFinishedGood = (data) => {
    return api.post(`${APIS.finished_goods}`, data);
  };

  const getAllFinishedGoods = () => {
    return api.get(`${APIS.finished_goods}`);
  };

  const getFinishedGoodById = (id) => {
    return api.get(`${APIS.finished_goods}/${id}`);
  };

  const updateFinishedGood = (id, data) => {
    return api.put(`${APIS.finished_goods}/${id}`, data);
  };

  const deleteFinishedGood = (id) => {
    return api.delete(`${APIS.finished_goods}/${id}`);
  };

  return {
    createFinishedGood,
    getAllFinishedGoods,
    getFinishedGoodById,
    updateFinishedGood,
    deleteFinishedGood,
  };
};

export default useFinishedGoods;
