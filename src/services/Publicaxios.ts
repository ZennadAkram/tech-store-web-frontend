import axios from "axios";

console.log("🔍 Axios baseURL =", import.meta.env.VITE_API_URL);

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default publicAxios;
