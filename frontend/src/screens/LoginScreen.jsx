import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Logo from "../components/Logo";

import image1 from "../images/image-1.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const redirect = "/welcome";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap(); //unwrap since it returns a promise and we want to unwrap the resolve value from the promise
      dispatch(setCredentials({ ...res }));
      navigate(redirect); //requests screen for now
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col
          md={7}
          style={{
            display: "flex", // Use flexbox to center the content
            flexDirection: "column", // Stack items vertically
            justifyContent: "center", // Center the content vertically
            alignItems: "flex-start", // Align items to the left
            padding: "20px", // Padding around the content
          }}
        >
          <Row className="align-items-center mb-3" style={{ width: "100%" }}>
            {/* Row with vertical centering and margin-bottom */}
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0",
                marginLeft: "20px", // Adjust the value to your preference
              }}
            >
              {/* Column for the logo and text */}
              <Logo style={{ color: "#6f42c1" }} />
              <h3 style={{ color: "#343a40", marginLeft: "10px" }}>Vuexy</h3>
              {/* Purple color for the logo and text color for Vuexy */}
            </Col>
          </Row>

          {/* Image below the logo */}
          <img
            src={image1}
            alt="Background"
            style={{
              width: "100%", // Make the image responsive to the column width
              maxHeight: "100vh", // Ensure the image does not exceed the viewport height
              objectFit: "cover", // Ensure the image covers the space without distortion
            }}
          />
        </Col>

        <Col
          md={5}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for the content area
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)", // Reduced shadow for less elevation
            width: "100%",
            maxWidth: "400px",
            margin: "auto", // Center the card vertically and horizontally
          }}
        >
          <h4
            style={{
              textAlign: "left",
              fontSize: "1.3rem", // Smaller heading size
              color: "#343a40",
              marginBottom: "10px",
            }}
          >
            Welcome to Vuexy!
          </h4>

          <p
            style={{
              textAlign: "left",
              fontSize: "0.85rem", // Slightly reduced font size for a more compact look
              lineHeight: "1.2", // Adjust line height for better readability
              marginBottom: "10px", // Reduced space between lines
              color: "#aaa", // Lighter color for faint text
            }}
          >
            Please sign in to your account and start the adventure
          </p>

          <div
            style={{
              textAlign: "left",
              fontSize: "0.85rem",
              color: "#6f42c1", // Purple color for email/password hint
              marginBottom: "20px",
              backgroundColor: "#f4e1f7", // Lighter purple background
              padding: "10px", // Padding inside the background area
              borderRadius: "8px", // Rounded corners for the background area
            }}
          >
            Email: admin@vuexy.com / Pass: admin
          </div>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                justifyContent: "space-between", // Align checkbox and link on the same line
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  htmlFor="rememberMe"
                  style={{
                    fontSize: "0.85rem",
                    marginRight: "5px", // Margin between checkbox and label
                    color: "#343a40", // Standard text color
                  }}
                >
                  Remember me
                </label>
                <input
                  type="checkbox"
                  id="rememberMe"
                  style={{
                    transform: "scale(1.2)", // Make the checkbox slightly larger
                    accentColor: "#6f42c1", // Purple color when checked
                  }}
                />
              </div>

              <Link
                to="#"
                style={{
                  fontSize: "0.85rem",
                  color: "#6f42c1", // Purple color for 'Forgot Password'
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="mt-3 w-100"
              disabled={isLoading}
              style={{
                padding: "10px 0",
                fontSize: "1.1rem",
                borderRadius: "8px",
                backgroundColor: "#6f42c1", // Purple button
                borderColor: "#6f42c1",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#5a2a9d")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6f42c1")}
            >
              Login
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
              New on our platform?{" "}
              <Link
                to="/register"
                disabled={true}
                style={{
                  textDecoration: "none",
                  color: "#6f42c1", // Purple color for the link
                  fontWeight: "600",
                }}
              >
                Create an account
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LoginScreen;
