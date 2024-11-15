"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// import store from "@/store";
// import { Provider } from "react-redux";

export default function Home({ children }) {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/dash/blogs");
    } else {
      router.push("/login");
    }
  }, [token]);

  return (
    // <Provider store={store}>
    children
    // </Provider>
  );
}
