import axios from "axios";

const instance = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
});
instance.baseURL: "https://localhost:7149",
instance.BaseUrl

export default instance;
