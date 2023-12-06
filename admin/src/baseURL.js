import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://kts-b5lr.onrender.com",
});

export default adminAxios;
