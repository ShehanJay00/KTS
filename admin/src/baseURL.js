import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://kts-group02.onrender.com",
});

export default adminAxios;
