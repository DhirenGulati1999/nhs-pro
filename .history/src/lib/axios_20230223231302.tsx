import axios, { HttpStatusCode } from "axios";

const Agent = new HttpStatusCode.Agent({
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
