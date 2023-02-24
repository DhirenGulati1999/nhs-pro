import axios from "axios";


const instance = axios.create({
    headers: {
        common: {
          Accept: 'text/plain, */*'
        }
      }
  
});

export default instance;
