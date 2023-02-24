import axios from "axios";

const Agent = new https.Agent({
    rejectUnauthorized: false
  })
  const instance = axios.create()
  // instance.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  instance.defaults.httpsAgent = Agent
  // instance.defaults.headers.common['Authorization'] = 'Basic YWx0ZXY='
  // instance.defaults.timeout = 14500

const instance = axios.create({
  baseURL: "https://localhost:7149",
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
});

export default instance;
