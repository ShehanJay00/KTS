import axios from "axios";

const userAxios = axios.create({
  baseURL: "https://kts-group02.onrender.com",
});

export default userAxios;
