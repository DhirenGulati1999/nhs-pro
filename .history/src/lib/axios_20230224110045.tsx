import https from "https";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7149",
});

export default instance;
