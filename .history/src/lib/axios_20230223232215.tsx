import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7149",
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
});

export default instance;
