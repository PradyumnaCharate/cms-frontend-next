"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = decodedToken.exp < Date.now() / 1000;

        if (isTokenExpired) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
