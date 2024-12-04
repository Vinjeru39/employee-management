import { useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { FaUsersCog } from "react-icons/fa";
import Logo from "./Logo";

import NotificationOverlay from "./NotificationOverlay";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/signin");
    } catch (err) {}
  };

  return (
    <header>
      <Navbar expand="lg" className="mb-3 shadow-sm" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              href="#home"
              className="fw-bold  d-flex align-items-center"
            >
              {/* Adding the New Icon */}
              <Logo /> Vuexy
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-Navbar-nav" />
          <Navbar.Collapse id="basic-Navbar-nav">
            <Nav className="ms-auto">
              {userInfo && (
                <>
                  <NotificationOverlay />
                  <NavDropdown
                    title={userInfo.name}
                    id="username"
                    align="end"
                    className="hover-dropdown"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
