import { endpoints } from "@/shared/configs/endpoints.config";
import Axios from "@/shared/utils/axios";
import { BookmarkResp } from "../_types/bookmark.type"

export const getBookmark = async () => {
  const { data } = await Axios.get(endpoints.bookmark.get);
  console.log("bookmark resp : ", data);
  return data;
};

export const createBookmark = async (markerId: number, nickname: string) => {

  const requestBody = new URLSearchParams();
  requestBody.append("markerId", JSON.stringify(markerId));
  requestBody.append("nickname", nickname);

  const { data } = await Axios.post(endpoints.bookmark.create, requestBody, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return data
};


export const deleteBookmark = async (markerId: number) => {
  const { data } = await Axios.delete(endpoints.bookmark.delete(markerId));
  return data
}

export const updateBookmark = async (id: number, formData: FormData) => {
  const { data } = await Axios.put(endpoints.bookmark.update(id), formData);
  return data
}