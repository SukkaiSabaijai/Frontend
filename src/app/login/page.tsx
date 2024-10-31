"use client";

import { getAccessToken } from "@/lib/getAccessToken";
import LoginPage from "@/modules/login/page";
import loginPage from "@/modules/login/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      router.replace("/");
    }
  }, []);
  return <LoginPage />;
}
