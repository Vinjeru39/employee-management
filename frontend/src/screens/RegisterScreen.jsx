import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Logo from "../components/Logo";

import image2 from "../images/image-2.png"; // Updated image import

const redirect = "/welcome";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!agree) {
      toast.error("You must agree to the privacy policy and terms.");
      return;
    }
    try {
      const res = await register({
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log("I got here");
      navigate(redirect); // assuming you want to navigate to the homepage
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col
          md={7}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "20px",
          }}
        >
          <Row className="align-items-center mb-3" style={{ width: "100%" }}>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0",
                marginLeft: "20px", // Adjust margin as needed
              }}
            >
              <Logo style={{ color: "#6f42c1" }} />
              <h3 style={{ color: "#343a40", marginLeft: "10px" }}>Vuexy</h3>
            </Col>
          </Row>

          <img
            src={image2} // Updated image
            alt="Background"
            style={{
              width: "100%",
              maxHeight: "100vh",
              objectFit: "cover",
            }}
          />
        </Col>

        <Col
          md={5}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <h4
            style={{
              textAlign: "left",
              fontSize: "1.3rem",
              color: "#343a40",
              marginBottom: "10px",
            }}
          >
            Adventure starts here!
          </h4>

          <p
            style={{
              textAlign: "left",
              fontSize: "0.85rem",
              lineHeight: "1.2",
              marginBottom: "10px",
              color: "#aaa",
            }}
          >
            Make your app management easy and fun
          </p>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#f1f3f5",
                }}
              />
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#f1f3f5",
                }}
              />
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#f1f3f5",
                }}
              />
            </Form.Group>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  htmlFor="agree"
                  style={{
                    fontSize: "0.85rem",
                    color: "#343a40",
                  }}
                >
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    style={{
                      transform: "scale(1.2)",
                      accentColor: "#6f42c1",
                    }}
                  />{" "}
                  I agree to the{" "}
                  <a
                    href="/privacy-policy"
                    style={{ color: "#6f42c1", textDecoration: "none" }}
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms"
                    style={{ color: "#6f42c1", textDecoration: "none" }}
                  >
                    terms
                  </a>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="mt-3 w-100"
              disabled={isLoading || !agree}
              style={{
                padding: "10px 0",
                fontSize: "1.1rem",
                borderRadius: "8px",
                backgroundColor: "#6f42c1",
                borderColor: "#6f42c1",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#5a2a9d")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6f42c1")}
            >
              Register
            </Button>

            {isLoading && (
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            )}
          </Form>

          <Row className="py-3">
            <Col style={{ textAlign: "center", fontSize: "0.9rem" }}>
              Already have an account?{" "}
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#6f42c1",
                  fontWeight: "600",
                }}
              >
                Login
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterScreen;
