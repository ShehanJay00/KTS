import axios from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:4000",
});

export default adminAxios;
