import axios from "axios";
//import { APP_API_URL } from "src/constants";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "";//APP_API_URL;
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
