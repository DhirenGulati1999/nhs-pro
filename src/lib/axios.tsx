import axios from "axios";

const instance = axios.create({
  baseURL: "http://sprint-procoreapi.newhomesourceprofessional.com/",
});

export default instance;
