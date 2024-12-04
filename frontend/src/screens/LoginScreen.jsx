import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

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
      <Row>
        <Col
          md={7}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start", // Align items to the top
            alignItems: "flex-start",
            padding: "0", // Ensure there's no padding
            height: "100%", // Full height for the column
          }}
        >
          <Row
            className="align-items-center"
            style={{ width: "100%", marginBottom: 0 }}
          >
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0", // Remove padding to align with the parent
                marginLeft: "50px", // Keep as is or adjust
                marginBottom: "0", // Remove bottom margin to avoid gap between logo and image
              }}
            >
              <Logo style={{ color: "#6f42c1" }} />
              <h3
                style={{
                  color: "#343a40",
                  marginLeft: "10px",
                  marginTop: "0", // Remove margin-top to eliminate space
                }}
              >
                Vuexy
              </h3>
            </Col>
          </Row>

          {/* Image below the logo with negative margin to reduce space */}
          <img
            src={image1}
            alt="Background"
            style={{
              width: "100%", // Full width of the column
              maxHeight: "80vh", // Control image height, adjust as needed
              objectFit: "contain", // Ensure the image scales properly
              marginTop: "0px", // Negative margin to reduce space between image and header
              marginBottom: "0", // Ensure no bottom margin
            }}
          />
        </Col>

        <Col
          md={5}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for the content area
            borderRadius: "8px",
            padding: "15px", // Reduced padding for a more compact look
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
              marginBottom: "8px", // Reduced margin-bottom
              marginTop: "6px",
            }}
          >
            Welcome to Vuexy! 👋🏻
          </h4>

          <p
            style={{
              textAlign: "left",
              fontSize: "0.85rem", // Slightly reduced font size for a more compact look
              lineHeight: "1.2", // Adjust line height for better readability
              marginBottom: "8px", // Reduced space between lines
              color: "#aaa", // Lighter color for faint text
            }}
          >
            Please sign in to your account and start the adventure
          </p>

          <div
            style={{
              textAlign: "left",
              fontSize: "0.75rem", // Smaller font size for hint
              color: "#6f42c1", // Purple color for email/password hint
              marginBottom: "16px", // Reduced margin-bottom
              backgroundColor: "#f0e8ff", // Lighter purple background
              padding: "8px", // Padding inside the background area
              borderRadius: "8px", // Rounded corners for the background area
            }}
          >
            Email: admin@vuexy.com / Pass: admin
          </div>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="my-2">
              <Form.Label
                style={{
                  fontSize: "0.85rem", // Smaller font size for label
                  marginBottom: "5px", // Reduced bottom margin
                }}
              >
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "6px 10px", // Reduced padding for smaller height
                  fontSize: "0.85rem", // Smaller text size
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#f1f3f5",
                }}
              />
            </Form.Group>

            <Form.Group controlId="password" className="my-2">
              <Form.Label
                style={{
                  fontSize: "0.85rem", // Smaller font size for label
                  marginBottom: "5px", // Reduced bottom margin
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "6px 10px", // Reduced padding for smaller height
                  fontSize: "0.85rem", // Smaller text size
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
                marginBottom: "16px", // Reduced bottom margin
              }}
            >
              <div>
                <label
                  htmlFor="rememberMe"
                  style={{
                    fontSize: "0.75rem", // Smaller font size for the label
                    color: "#343a40", // Standard text color
                  }}
                >
                  <input
                    type="checkbox"
                    id="rememberMe"
                    style={{
                      transform: "scale(1.2)", // Make the checkbox slightly larger
                      accentColor: "#6f42c1", // Purple color when checked
                    }}
                  />{" "}
                  Remember me
                </label>
              </div>

              <Link
                to="#"
                style={{
                  fontSize: "0.75rem", // Smaller font size for 'Forgot password'
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
              className="mt-2 w-100"
              disabled={isLoading}
              style={{
                padding: "6px 0", // Reduced padding for smaller button height
                fontSize: "0.85rem", // Smaller text size
                borderRadius: "8px",
                backgroundColor: "#6f42c1", // Purple button
                borderColor: "#6f42c1",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#5a2a9d")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6f42c1")}
            >
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Login
            </Button>
          </Form>

          <Row className="py-3">
            <Col style={{ textAlign: "center", fontSize: "0.85rem" }}>
              New on our platform?{" "}
              <Link
                to="/register"
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
