import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-project-2bfd1.firebaseio.com11/"
});

export default instance;
