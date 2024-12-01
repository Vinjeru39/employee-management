import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const AddUserScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [employeeID, setEmployeeID] = useState("");
  const [grade, setGrade] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          employeeID,
          grade,
          jobTitle,
        }).unwrap();
        navigate("/userlist"); // assuming you want to navigate to the homepage
      } catch (err) {
        toast(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div className="form-box shadow-lg p-5 rounded">
        <h1 className="form-title">Add New Employee</h1>
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
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group controlId="employeeID" className="my-3">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Employee ID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group controlId="grade" className="my-3">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group controlId="jobTitle" className="my-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              type="submit"
              variant="primary"
              className="mt-2 submit-btn"
              disabled={isLoading}
            >
              Submit
            </Button>

            {isLoading && <Loader />}
          </div>
        </Form>
      </div>
    </FormContainer>
  );
};

export default AddUserScreen;
