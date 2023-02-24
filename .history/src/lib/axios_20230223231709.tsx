import axios from "axios";

const Agent = new https.Agent({
    rejectUnauthorized: false
  })
 

const instance = axios.create({
  baseURL: "https://localhost:7149",
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
});
instance.defaults.httpsAgent = Agent


export default instance;
