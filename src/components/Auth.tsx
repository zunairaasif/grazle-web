"use client";
import { getProfileApi } from "@/apis";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";

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
