"use client";

import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")!;
    }

    if (token === null) {
      window.location.href = "/signIn";
    }
  }, []);
  return <div>{children}</div>;
}
