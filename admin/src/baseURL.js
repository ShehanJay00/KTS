import axios from "axios";

const adminAxios = axios.create({
  // baseURL: "http://52.21.93.108:4000",
  baseURL: "http://localhost:4000",
});

export default adminAxios;
