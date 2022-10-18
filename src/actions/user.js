import axios from "../utils/axios";
import g_axios from "axios";

export async function loginAction(data) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  const response = await axios.post("/login", formData);
  if (response.status === 200) return response.data;
  else return [];
}

export async function registerAction(data) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  const response = await axios.post("/register", formData);
  if (response.status === 200) return response.data;
  else return [];
}

export async function getUserInfo() {
  const response = await axios.post("/getUserInfo", {});
  if (response.status === 200) return response.data;
  else return [];
}

export async function setUserInfo(data) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  const response = await axios.post("/setUserInfo", formData);
  if (response.status === 200) return response.data;
  else return [];
}

export async function getGeoInfo() {
  let data = {
    lat:61.52401,
    lng:61.52401,
    username:61.52401,
  };
  const response = await g_axios.get("http://api.geonames.org/countryCode", data);
  if (response.status === 200) return response.data;
  else return [];
}

export async function loginAction_(data) {
  const response = await axios.post("/api/loginAjax.action", {
    data,
    token: window.localStorage.getItem("accessToken"),
  });
  if (response.status === 200) return response.data;
  else return [];
}