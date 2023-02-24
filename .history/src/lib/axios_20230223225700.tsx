import axios from "axios";

/ At instance level
const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});
instance.get('https://something.com/foo');

const instance = axios.create({
  baseURL: "https://localhost:7149",
});

export default instance;
