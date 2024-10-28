import Cookies from "js-cookie";

export function getAccessToken() {
  // Retrieve the accessToken directly with js-cookie
  return Cookies.get("accessToken") || null;
}