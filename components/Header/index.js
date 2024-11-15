"use client";
import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { selectAuth } from "../features/authSlice";
import { FaUserCircle, FaBars, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
// import Link from "next/link";

export default function Header({ sidebarHandler }) {
  // const { user, token } = useSelector(selectAuth);

  return (
    <>
      {true ? (
      <Navbar className="header" style={{height:'60px'}}>
      <Container fluid className="ps-0">
        <GiHamburgerMenu
          style={{
            fontSize: "1.5rem",
            color: "var(--primary-color)",
            marginLeft: "1rem",
            cursor: "pointer",
          }}
          onClick={() => sidebarHandler()}
        />

        <Nav className="ms-auto" >
          <Dropdown align="end">
            <Dropdown.Toggle
              id="user_profile"
              className="right-profile-logo rounded-pill"
              variant="light"
            >
              {/* <img
                src={userInfo?.avatar}
                alt="profile_img"
                className="dropdown-logo"
              /> */}
              <FaUserCircle />
            </Dropdown.Toggle>

            <Dropdown.Menu variant="light">
              <Dropdown.Header>
                Signed in as
                <br />
                {/* <b>{userInfo?.fullname}</b> */}
                {/* <h6 className="mb-0">{user?.name || 'Admin'}</h6> */}
                <h6 className="mb-0">{'Admin'}</h6>
              </Dropdown.Header>

              <Dropdown.Divider />
              <Dropdown.Item>
                {/* <Link to="/dash/profile" className="dropdown-item"> */}
                  <FaUser className="me-2" /> Profile
                {/* </Link> */}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
      ) : (
        <></>
      )}
    </>
  );
}
