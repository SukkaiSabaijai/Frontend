import Cookies from "js-cookie";

export function getAccessToken() {
  return Cookies.get("accessToken") || null;
}

export function getRefreshToken() {
  return Cookies.get("refreshToken") || null;
}

export function setAccessToken(token: string) {
  Cookies.set("accessToken", token, { expires: 1 / 96 });
}

export function setRefreshToken(token: string) {
  Cookies.set("refreshToken", token, { expires: 7 });
}

export function clearTokens() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}