import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Login.css";
const LoginForm = () => {
  const { login, isLoggedIn, userInfo, loginError } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userInfo) {
      navigate("/myInfo");
    }
  }, [isLoggedIn, userInfo, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await login(username, password);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center login-container">
      <Row>
        <Col className="bg-light shadow rounded p-5 form-column">
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleSubmit}>
            {loginError && <div className="error-message">{loginError}</div>}
            <Form.Group className="mb-4" controlId="formBasicUsername">
              <Form.Label className="mb-1">Username</Form.Label>{" "}
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="mb-1">Password</Form.Label>{" "}
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p>
                <Link to="/signUp">No account? Sign up here</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
