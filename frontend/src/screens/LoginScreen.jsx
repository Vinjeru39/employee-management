import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

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
      const res = await login({ email, password }).unwrap(); //unwrap since it retuens a promise and we want to unwrap the resolve value from the promise
      dispatch(setCredentials({ ...res }));
      navigate(redirect); //requests screen for now
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginTop: "-90px", // Slightly shift up to align the form within the center
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "#343a40",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Sign In
        </h1>

        <Form onSubmit={submitHandler}>
          {/* Email Field */}
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
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

          {/* Password Field */}
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

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-100"
            disabled={isLoading}
            style={{
              padding: "10px 0",
              fontSize: "1.1rem",
              borderRadius: "8px",
              backgroundColor: "#007bff",
              borderColor: "#007bff",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Sign In
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

        {/* Register Link */}
        <Row className="py-3">
          <Col style={{ textAlign: "center", fontSize: "0.9rem" }}>
            New User?{" "}
            <Link
              to="#"
              disabled={true}
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontWeight: "600",
              }}
            >
              Register
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginScreen;
