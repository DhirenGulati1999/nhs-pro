import https from "https";
import axios from "axios";

// const instance = axios.create({
   baseURL: "https://localhost:7149",
 });

// export default instance;
/**
 * Axios default settings
 */
axios.defaults.baseURL = "https://localhost:7149";

/**
 * Disable only in development mode
 */
if (process.env.NODE_ENV === "development") {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios.defaults.httpsAgent = httpsAgent;
  // eslint-disable-next-line no-console
  console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`);
}
