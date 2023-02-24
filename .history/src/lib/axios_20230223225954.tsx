import axios from "axios";


const instance = axios.create({
  baseURL: "https://localhost:7149",
  rejectUnauthorized: false,
});

export default instance;
