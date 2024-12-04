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
import rocket from "../images/rocket.png"; // Updated image import

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
            src={image2}
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            height: "100vh",
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
            Adventure starts here 🚀
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
            <Form.Group controlId="name" style={{ marginBottom: "8px" }}>
              <Form.Label
                style={{
                  fontSize: "0.85rem",
                  color: "#343a40",
                  marginBottom: "5px",
                }}
              >
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  padding: "6px 10px", // Reduced padding for smaller height
                  fontSize: "0.85rem", // Smaller text size
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#f1f3f5",
                }}
              />
            </Form.Group>

            <Form.Group controlId="email" style={{ marginBottom: "8px" }}>
              <Form.Label
                style={{
                  fontSize: "0.85rem",
                  color: "#343a40",
                  marginBottom: "5px",
                }}
              >
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "6px 10px", // Reduced padding for smaller height
                  fontSize: "0.85rem", // Smaller text size
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#f1f3f5",
                }}
              />
            </Form.Group>

            <Form.Group controlId="password" style={{ marginBottom: "8px" }}>
              <Form.Label
                style={{
                  fontSize: "0.85rem",
                  color: "#343a40",
                  marginBottom: "5px",
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px", // Reduced bottom margin
              }}
            >
              <div>
                <label
                  htmlFor="agree"
                  style={{
                    fontSize: "0.75rem", // Smaller font size for the checkbox label
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
                    privacy policy and terms
                  </a>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="mt-2 w-100" // Reduced top margin for the button
              disabled={isLoading || !agree}
              style={{
                padding: "6px 0", // Reduced padding for smaller button height
                fontSize: "0.85rem", // Smaller text size
                borderRadius: "8px",
                backgroundColor: "#5a2a9d", // Darker purple color
                borderColor: "#5a2a9d", // Darker border
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4b1f84")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#5a2a9d")}
            >
              Sign Up
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
            <Col style={{ textAlign: "center", fontSize: "0.85rem" }}>
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
