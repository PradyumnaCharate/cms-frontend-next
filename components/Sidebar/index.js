"use client";

import "./Sidebar.css";
import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
import { BiSolidDashboard } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { clearAuth, selectAuth } from "@/features/authSlice";

const linkList = [
  {
    icon: <BiSolidDashboard className="icon-md" />,
    text: "Home",
    url: "/dash/home",
  },
  {
    icon: <MdEdit className="icon-md" />,
    text: "Blogs",
    url: "/dash/blogs",
  },
  {
    icon: <MdEdit className="icon-md" />,
    text: "Content Pages",
    url: "/dash/contentpages",
  },
];



export default function SideNavbar({ isExpanded }) {

  
  const router = useRouter();
  // const pathname = router.pathname;
  const [activeLink, setActiveLink] = useState("Dashboard");
  // const { token } = useSelector(selectAuth);
  // const dispatch = useDispatch();

  const signoutHandler = () => {
    // dispatch(clearAuth());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push("/login");
  };
  const handleNavigation = (url) => {
    // router.push(url);
    setActiveLink(url);
    // dispatch(clearAuth());
    // router.push("/");
  };

  // const activeLinkHandler = (url) => pathname.includes(url);

  const cls = `nav-item has-treeview ${
    isExpanded ? "menu-item" : "menu-item menu-item-NX"
  }`;

  return (
    <>
      {true && (
       <div
       className={
         isExpanded
           ? "side-nav-container shadow glass-morf"
           : "side-nav-container side-nav-container-NX "
       }
     >
       <div className="brand-link d-flex align-items-center" >
         {/* <img src="/logo/sciendaLogo.png" alt="" width={'42px'} height={"42px"} /> */}
         <span className="brand-text ms-2 font-weight-light">
          CMS
         </span>
       </div>

       <div className="sidebar border-top">
         {/* Sidebar user panel (optional) */}
         {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
           <div className="info">
             <Link to="/view-profile" className="d-block">
               {userInfo?.avatar && (
                 <img
                   src={userInfo?.avatar}
                   alt=""
                   style={{
                     width: "40px",
                     height: "40px",
                     borderRadius: "50%",
                     marginRight: "0.5rem",
                   }}
                 />
               )}
               <FaUserCircle className="text-white mx-2" size={"25px"} />

               <span className="info-text">
                 Welcome {userInfo ? `${userInfo.fullname}` : "Back"}
               </span>
             </Link>
           </div>
         </div> */}
         {/* Sidebar Menu */}
         <nav className="pt-3">
           <ul
             className="nav-pills nav-sidebar px-0 d-flex flex-column flex-wrap"
             data-widget="treeview"
             role="menu"
             data-accordion="false"
             style={{rowGap:'1rem'}}
           >
             {linkList.map(({ icon, text, url }) => (
               <li
                 key={url}
                 className={`${cls}
                  
                 `}
                 onClick={() => setActiveLink(url)}
               >
                 <Link href={url} className="nav-link rounded-3">
                  <div>{icon}</div>
                   <span className="ms-2 nav-item-text">{text}</span>
                 </Link>
               </li>
             ))}

             {/* <li className={cls} 
             // style={{marginTop:'auto'}}
             >
               <Link  to="/admin/tickets" className="nav-link">
               <HiOutlineTicket  className="icon-md" />
                 <p className="ms-2">Tickets</p>
               </Link>
             </li> */}
            
            
              
             
           </ul>
         </nav>
         {/* /.sidebar-menu */}
       </div>

       <div className="sidebar-footer border-top">
       <ul
             className="nav-pills nav-sidebar px-0 d-flex flex-column flex-wrap"
             data-widget="treeview"
             role="menu"
             data-accordion="false"
           >
          <li className={cls}>
       {/* <Link onClick={signoutHandler} to="/" className="nav-link"> */}
       <div className="nav-link" onClick={signoutHandler}>
                <div><FaSignOutAlt className="icon-md" /></div>
                 <span className="ms-2 nav-item-text">Log Out</span>
               {/* </Link> */}
               </div>
               </li>
               </ul>
       </div>
     </div>
      )}
    </>
  );
}
