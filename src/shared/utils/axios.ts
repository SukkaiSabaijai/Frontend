import axios, { AxiosInstance } from "axios";

// const token = "";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // headers: {
  //   Authorization: `Bearer ${token}`, 
  // },
});

export default instance;
