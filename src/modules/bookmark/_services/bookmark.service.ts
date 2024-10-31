import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";
import { BookmarkResp } from "../_types/bookmark.type"

export const getBookmark = async () => {
  const { data } = await Axios.get(endpoints.bookmark.get);
  console.log("bookmark resp : ", data);
  return data;
};

