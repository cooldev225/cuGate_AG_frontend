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

export async function getGenres() {
  const response = await axios.post("/getGenres", {});
  if (response.status === 200) return response.data;
  else return [];
}

export async function getMoods() {
  const response = await axios.post("/getMoods", {});
  if (response.status === 200) return response.data;
  else return [];
}

export async function getFilterStations() {
  const response = await axios.post("/getFilterStations", {});
  if (response.status === 200) return response.data;
  else return [];
}

export async function getSearchTrackList(params) {
  const response = await axios.post("/getSearchTrackList", params);
  if (response.status === 200) return response.data;
  else return [];
}

export async function getGeoInfo(lat, long) {
  let data = {
    lat: lat,
    lng: long,
    username: "goldstar22501",
  };
  const response = await g_axios.get("http://api.geonames.org/countryCode", data);
  if (response.status === 200) return response.data;
  else return [];
}