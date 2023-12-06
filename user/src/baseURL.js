import axios from "axios";

const userAxios = axios.create({
  baseURL: "https://kts-b5lr.onrender.com",
});

export default userAxios;
