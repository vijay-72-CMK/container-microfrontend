import { useState, useContext } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./RegisterStyles.css";

const RegisterForm = () => {
  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username cannot exceed 50 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^@]+@[^@]+\.[^@]+$/, "Invalid email format"),
    firstName: yup
      .string()
      .required("First Name is required")
      .max(50, "First Name cannot exceed 50 characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .max(50, "Last Name cannot exceed 50 characters"),
    mobileNumber: yup
      .string()
      .required("Mobile Number is required")
      .matches(
        /^(\+\d{1,3}( )?)?((\(\d{1,3}\))|\d{1,3})[- .]?\d{3,4}[- .]?\d{4}$/,
        "Invalid mobile number format"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  });
  const { registerError, register } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await registerSchema.validate(formData, { abortEarly: false });
      setErrors({});
      register(formData);
      setFormData({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center register-container">
      <Row>
        <Col className="bg-light shadow rounded p-5 form-column">
          <h3 className="text-center mb-4">Register</h3>
          <Form onSubmit={handleSubmit}>
            {registerError && (
              <div className="error-message">{registerError}</div>
            )}
            <Form.Group className="mb-4" controlId="formBasicUsername">
              <Form.Label className="mb-1">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="mb-1">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicFirstName">
              <Form.Label className="mb-1">First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicLastName">
              <Form.Label className="mb-1">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicMobileNumber">
              <Form.Label className="mb-1">Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                isInvalid={!!errors.mobileNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobileNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
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
                Register
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Container>
  );
};
export default RegisterForm;
