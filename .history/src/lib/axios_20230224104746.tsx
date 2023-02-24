import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.newhomesource.com/api/v2/",
});

export default instance;
