import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";

export const test = async () => {
  const { data } = await Axios.get("/");

  console.log(data);
  return data;
};
