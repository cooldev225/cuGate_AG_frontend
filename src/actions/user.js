import axios from "../utils/axios";
import g_axios from "axios";

export async function loginAction(data) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  const response = await axios.post("/login", formData,
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    }
  );
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
  if (response.status === 200) {
    return response.data;
  }
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

export async function getSearchTrackTitleList(params) {
  const response = await axios.post("/getSearchTrackTitleList", params);
  if( response.status === 200 ) return response.data;
  return [];
}

export async function getSearchAlbumList(params) {
  const response = await axios.post("/getSearchAlbumList", params);
  if (response.status === 200) return response.data;
  else return [];
}

export async function getSearchArtistList(params) {
  const response = await axios.post("/getSearchArtistList", params);
  if (response.status === 200) return response.data;
  else return [];
}

export async function getSearchStationList(params) {
  const response = await axios.post("/getSearchStationList", params);
  if (response.status === 200) return response.data;
  else return [];
}

export async function uploadTrackToAnalyze(file) {
  let formData = new FormData();
  formData.append("musicFile", file);
  const response = await axios.post(
    "/uploadTrackToAnalyze",
    formData,
    {
      headers: {}
    }
  );
  if (response.status === 200) return response.data;
}

export async function getAnalyzeTrackInfo(data) {
  let formData = new FormData();
  formData.append("filename", data.filename);
  const response = await axios.post(
    "/getAnalyzeTrackInfoJson",
    formData,
    {
      headers: {}
    }
  );
  if (response.status === 200) return response.data;
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

export async function getSubGenre(genre){
  const response = await axios.get("/getSubGenre");
  if( response.status === 200 ) return response.data;
  return [];
}

export async function getPerformerList(keyword) {
  const response = await axios.get("/getPerformerListByKeyword");
  if( response.status === 200 ) return response.data;
  return [];
}

export async function createTrack(trackData) {
  const response = await axios.post("/createTrack", trackData, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  });
  if( response.status === 200 ) return response.data;
  return [];
}