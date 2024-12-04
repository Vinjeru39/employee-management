import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom"; //Oulet for the router

import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from "react-bootstrap";
import SideNav from "./components/SideNav";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {/* {userInfo && (
          <Col md={2}>
            <SideNav />
          </Col>
        )} */}
      {userInfo ? (
        <>
          <Header />
          <Row style={{ marginTop: "90px" }}>
            <div>
              <Col md={2}>
                <SideNav />
              </Col>
              <Col md={10}>
                <Outlet />
              </Col>
            </div>
          </Row>
        </>
      ) : (
        <Outlet />
      )}

      <ToastContainer />
    </>
  );
}

export default App;
