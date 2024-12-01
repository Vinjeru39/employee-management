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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [grade, setGrade] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const navigate = useNavigate();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setEmployeeID(user.employeeID);
      setGrade(user.grade);
      setJobTitle(user.jobTitle);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await updateUser({
          userId: id,
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

export default EditUserScreen;
