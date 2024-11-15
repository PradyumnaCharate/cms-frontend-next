"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/index";
import Header from "@/components/Header/index";

export default function DefaultLayout({ children }) {

  const [isExpanded, setExpandState] = useState(false);
  const sidebarHandler = () => setExpandState((prev) => !prev);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setExpandState(window.innerWidth > 768);

      const handleResize = () => {
        setExpandState(window.innerWidth > 768);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);


  return (
    <div className="main-wrapper">
      {isExpanded && true && (
        <div className="sidebar-overlay" onClick={sidebarHandler}></div>
      )}
      <div className="sidebar-wrapper  drop-shadow-lg">
        <Sidebar isExpanded={isExpanded} />
      </div>
      <div
        className={`body-wrapper ${isExpanded ? "mini-body" : "full-body"} 
        ${true ? "" : "m-0"} d-flex flex-column`}
      >
        <Header sidebarHandler={sidebarHandler} />
       {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
