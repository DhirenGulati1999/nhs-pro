import https from "https";
import axios from "axios";

/**
 * Axios default settings
 */
axios.defaults.baseURL = config.apiURL

/**
 * Disable only in development mode
 */
if (process.env.NODE_ENV === 'development') {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
  axios.defaults.httpsAgent = httpsAgent
  // eslint-disable-next-line no-console
  console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`)
}
