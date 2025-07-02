const host = import.meta.env.VITE_SERVER_URL;

export const API_URL = `${host}/api`;

export const APIS = {
  dashboard: API_URL + "/dashboard",
  finished_goods: API_URL + "/finished_goods",
  production: API_URL + "/production",
  purchase_order: API_URL + "/purchase_order",
  quality: API_URL + "/quality",
  raw_material: API_URL + "/raw_material",
  sales: API_URL + "/sales",
};
