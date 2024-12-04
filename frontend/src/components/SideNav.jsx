import { useState } from "react";
import { Nav, Offcanvas, Button } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaUserEdit,
} from "react-icons/fa";

const SideNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="inherit" onClick={handleShow} className="d-md-none">
        <MdMenu size="30px" />
      </Button>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Nav className="flex-column">
            <Nav.Link
              href="/welcome"
              className="mb-2 d-flex align-items-center"
              style={{
                fontSize: "14px",
                color: "#343a40",
                borderBottom: "1px solid #ddd", // Line separator
              }}
            >
              <FaTachometerAlt className="me-2" /> Welcome
            </Nav.Link>
            <Nav.Link
              href="/userlist"
              className="my-2 d-flex align-items-center"
              style={{
                fontSize: "14px",
                color: "#343a40",
                borderBottom: "1px solid #ddd", // Line separator
              }}
            >
              <FaUsers className="me-2" /> User List
            </Nav.Link>
            <Nav.Link
              href="/adduser"
              className="my-2 d-flex align-items-center"
              style={{
                fontSize: "14px",
                color: "#343a40",
                borderBottom: "1px solid #ddd", // Line separator
              }}
            >
              <FaUserPlus className="me-2" /> Add Employee
            </Nav.Link>
          </Nav>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
      <div
        className="d-none d-md-block bg-light"
        style={{
          width: "170px",
          height: "100vh",
          padding: "5px 10px", // Minimal padding on all sides
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Nav className="flex-column">
          <Nav.Link
            href="/welcome"
            className="mb-2 d-flex align-items-center"
            style={{
              fontSize: "14px",
              color: "#343a40",
              borderBottom: "1px solid #ddd", // Line separator
            }}
          >
            <FaTachometerAlt className="me-2" /> Welcome
          </Nav.Link>
          <Nav.Link
            href="/userlist"
            className="my-2 d-flex align-items-center"
            style={{
              fontSize: "14px",
              color: "#343a40",
              borderBottom: "1px solid #ddd", // Line separator
            }}
          >
            <FaUsers className="me-2" /> User List
          </Nav.Link>
          <Nav.Link
            href="/adduser"
            className="my-2 d-flex align-items-center"
            style={{
              fontSize: "14px",
              color: "#343a40",
              borderBottom: "1px solid #ddd", // Line separator
            }}
          >
            <FaUserPlus className="me-2" /> Add Employee
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default SideNav;
