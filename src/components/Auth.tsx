"use client";
import { getProfileApi } from "@/apis";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await getProfileApi();
      } catch (error) {
        if (error) {
          localStorage.removeItem("token");
          router.push("/signIn");
        }
      }
    })();
  }, []);
  return <div></div>;
};

export default Auth;
