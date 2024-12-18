import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children, size = 6 }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={size}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
