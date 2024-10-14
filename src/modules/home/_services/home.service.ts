import { endpoints } from "@/shared/configs/endpoints.config";
import axios from "axios";

export const test = async () => {
  const { data } = await axios.get("http://localhost:3001/");

  console.log(data);
  return data;
};
