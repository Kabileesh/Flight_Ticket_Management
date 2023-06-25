import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../UI/HeaderLayout.css"
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";

const HeaderLayOut = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const [showBasic, setShowBasic] = useState(false);

  return (
    <header>
      <MDBNavbar
        expand="lg"
        light
        bgColor="white"
        style={{
          paddingBottom: "2rem",
          paddingLeft: "1rem",
          paddingTop: "2rem",
        }}
      >
        <MDBContainer fluid>
          <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav
              left
              className="mb-2 mb-lg-0"
              style={{ fontSize: "1.3rem" }}
            >
              <MDBNavbarItem active>
                <MDBNavbarLink aria-current="page">
                  <Link to={"/"}>Home</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link to={"/book-ticket"}>Look for a Journey</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link to={"/view-bookings"}>My Bookings</Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              {user ? (
                <div style={{marginTop: "0.5%", paddingLeft: "2%"}}>
                  {/* <MDBNavbarItem>
                    <p>Welcome, {user}!</p>
                  </MDBNavbarItem> */}
                  <MDBNavbarItem>
                    <MDBBtn onClick={handleLogout}>Logout</MDBBtn>
                  </MDBNavbarItem>
                </div>
              ) : (
                <MDBNavbarItem>
                  <Link className="navbar__item" to={"/register"}>
                    Sign Up
                  </Link>
                  <Link className="navbar__item" to={"/login"}>
                    Login
                  </Link>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default HeaderLayOut;
