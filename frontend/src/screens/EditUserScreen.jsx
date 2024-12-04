import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const EditUserScreen = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading: userLoading,
    error,
  } = useGetUserDetailsQuery(id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        userId: id,
        name,
        email,
        password,
      }).unwrap();
      navigate("/userlist"); // assuming you want to navigate to the homepage
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div style={{ marginLeft: "140px", width: "100%" }}>
      <FormContainer>
        <div className="form-box shadow-lg p-5 rounded">
          <h1 className="form-title">Edit Employee Details</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control-custom"
                style={{ maxWidth: "500px", width: "100%" }} // Makes form wider
              />
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control-custom"
                style={{ maxWidth: "500px", width: "100%" }} // Makes form wider
              />
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-custom"
                style={{ maxWidth: "500px", width: "100%" }} // Makes form wider
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                type="submit"
                variant="primary"
                className="mt-2 submit-btn"
                disabled={isLoading}
                style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }} // Purple theme
              >
                Submit
              </Button>

              {isLoading && <Loader />}
            </div>
          </Form>
        </div>
      </FormContainer>
    </div>
  );
};

export default EditUserScreen;
