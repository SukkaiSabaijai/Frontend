import axios, { AxiosInstance } from "axios";

// const token = "";

const instance: AxiosInstance = axios.create({
  baseURL: "http://api.toiletnearme.org/",
  // headers: {
  //   Authorization: `Bearer ${token}`, 
  // },
});

export default instance;
