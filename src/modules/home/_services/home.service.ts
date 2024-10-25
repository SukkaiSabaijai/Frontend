import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";
import axios from "axios";

export const test = async () => {
  const { data } = await Axios.get(endpoints.toilet.create);

  console.log(data);
  return data;
};
