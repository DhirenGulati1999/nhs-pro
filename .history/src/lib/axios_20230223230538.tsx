import axios from "axios";

const instance = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
});
inbaseURL: "https://localhost:7149",
instance.BaseUrl

export default instance;
