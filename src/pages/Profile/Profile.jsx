import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { Modal, Form, Image, Button } from "react-bootstrap";
import AddressesMapped from "../../components/AddressMapped";
import "./profile.css";
import CustomButton from "../../components/CustomButtonComponent/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";

const Profile = () => {
  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Old password is required")
      .notOneOf(
        [Yup.ref("newPassword")],
        "Old and new passwords cannot be the same"
      ),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const { isLoggedIn, userInfo, logout } = useContext(UserContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  const [showModal, setShowModal] = useState(false);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    setChangePassword({
      ...changePassword,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = changePassword;
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await passwordValidationSchema.validate(
        { oldPassword, newPassword },
        { abortEarly: false }
      );
      const response = await axios.post(
        "http://localhost:8080/api/users/changePassword",
        {
          currentPassword: oldPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message || "Password changed successfully");
      setShowModal(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = error.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        for (const field in errorMessages) {
          toast.error(errorMessages[field]);
        }
      } else {
        console.log(error);
        toast.error("Error, old password is not right");
      }
    }
  };

  return (
    <>
      <div className="d-flex gap-5 align-items-center w-75 justify-content-between m-auto">
        <Image src="profile2.svg" className="w-50 illustration" />
        <div className="">
          <div>
            <div className="profile-info-row">
              <div>
                <p className="userFields">
                  <strong>Name: </strong>
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="userFields">
                  <strong>Email: </strong> {userInfo.email}
                </p>
                <p className="userFields">
                  <strong>Mobile Number:</strong> {userInfo.mobileNumber}{" "}
                </p>
              </div>
            </div>
            <div className="d-flex gap-4">
              <CustomButton
                size="lg"
                onClick={() => setShowModal(true)}
                outline={true}
              >
                Reset password
              </CustomButton>
              <CustomButton size="lg" onClick={() => logout()}>
                Logout
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-75 m-auto" />
      <div className="d-flex gap-5 align-items-center w-75 justify-content-between m-auto">
        <AddressesMapped />
        <Image src="address.svg" className="w-50 illustration" />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={changePassword.oldPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={changePassword.newPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={changePassword.confirmPassword}
                onChange={handleInputChange}
                required
                className="mb-4"
              />
            </Form.Group>
            <CustomButton size="lg" type="submit" outline={true}>
              Submit
            </CustomButton>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};

export default Profile;
