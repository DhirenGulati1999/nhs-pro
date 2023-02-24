import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7149",
});

export default instance;
