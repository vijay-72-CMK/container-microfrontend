import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import * as yup from "yup";

const LoginForm = () => {
  const { login, isLoggedIn, userInfo, loginError } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username cannot exceed 50 characters"),
    password: yup.string().required("Password is required"),
  });

  useEffect(() => {
    console.log("Inside use effect of login form");
    if (isLoggedIn && userInfo) {
      toast.success("Logged in succesfully!");
      navigate("/myInfo");
    }
  }, [isLoggedIn, userInfo, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});
      await login(formData.username, formData.password);
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
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
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="mb-1">Password</Form.Label>{" "}
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
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
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Container>
  );
};

export default LoginForm;
