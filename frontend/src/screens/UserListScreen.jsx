import { LinkContainer } from "react-router-bootstrap";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container style={{ marginLeft: "185px" }}>
      <Row className="d-flex justify-content-between mb-4">
        <Col>
          <h3 className="text-primary">Manage Employees</h3>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/adduser">
            <Button
              className="btn-gradient-primary"
              style={{
                padding: "8px 18px",
                fontSize: "0.95rem",
                backgroundColor: "#6f42c1", // Purple color for the button
                borderColor: "#6f42c1",
              }}
            >
              Add Employee
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table
          striped
          hover
          responsive
          bordered
          className="table-sm shadow-sm"
          style={{
            borderRadius: "8px",
            fontSize: "0.9rem", // Smaller font size for a compact table
          }}
        >
          <thead className="bg-purple text-white">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="align-middle">
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-decoration-none text-primary"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="text-center">
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td className="text-center">
                  <LinkContainer to={`/edituser/${user._id}`}>
                    <Button
                      variant="outline-info"
                      className="btn-sm mx-1"
                      style={{ borderColor: "#6f42c1", color: "#6f42c1" }}
                    >
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="outline-danger"
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListScreen;
