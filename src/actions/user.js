import axios from "../utils/axios";

export async function loginAction(data) {
  const response = await axios.post("/api/loginAjax.action", {
    data,
    token: window.localStorage.getItem("accessToken"),
  });
  if (response.status === 200) return response.data;
  else return [];
}