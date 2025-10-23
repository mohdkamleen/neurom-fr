import axios from 'axios';

export default axios.create({
  baseURL: "https://www.aws.tbcla.in/api",
  //baseURL: "https://api.tbcla.in/api",
  //baseURL: "http://localhost:5000/api"
});
