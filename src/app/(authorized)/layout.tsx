import { getProfileApi } from "@/apis";
import Auth from "@/components/Auth";
import { useEffect } from "react";
// const [isAuthenticated, setIsAuthenticated] = useState(false);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Auth />
      {children}
    </div>
  );
}
