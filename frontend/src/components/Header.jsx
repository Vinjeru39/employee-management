import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { FaUsersCog } from "react-icons/fa";
import Logo from "./Logo";

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
      <Navbar
        expand="lg"
        fixed="top"
        style={{
          padding: "0.5rem 1rem", // Slimmer padding
          backgroundColor: "#ffffff", // Solid background color
          borderBottom: "1px solid #ddd", // Subtle bottom border
          boxShadow: "none", // No elevation or shadow
        }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              href="#home"
              className="fw-bold d-flex align-items-center"
              style={{ margin: "0" }} // Remove extra margin
            >
              <Row
                className="align-items-center"
                style={{
                  width: "100%",
                  margin: "0",
                  padding: "0", // Remove padding from the Row
                  height: "50px", // Set a fixed height to control row size
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0", // Remove any padding from the Col
                    marginLeft: "10px", // Keep margin for proper alignment
                  }}
                >
                  <Logo style={{ color: "#6f42c1", height: "25px" }} />{" "}
                  {/* Reduced logo size */}
                  <h3
                    style={{
                      color: "#343a40",
                      marginLeft: "8px", // Adjust the space between the logo and text
                      fontSize: "1rem", // Keep text compact
                      marginBottom: "0", // Ensure no extra bottom margin
                      lineHeight: "1", // Compact the line height
                    }}
                  >
                    Vuexy
                  </h3>
                </Col>
              </Row>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-Navbar-nav" />
          <Navbar.Collapse id="basic-Navbar-nav">
            <Nav className="ms-auto">
              {userInfo && (
                <>
                  <NavDropdown
                    title={userInfo.name}
                    id="username"
                    align="end"
                    className="hover-dropdown"
                  >
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
