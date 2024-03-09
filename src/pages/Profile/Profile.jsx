import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Nav, Card, Image, Button } from "react-bootstrap";
import AddressesMapped from "../../components/AddressMapped";
import "./profile.css";
import CustomButton from "../../components/CustomButtonComponent/CustomButton";

const Profile = () => {
  const { isLoggedIn, userInfo, logout, setUserImage, userImage } =
    useContext(UserContext);
  console.log("yo" + userInfo + isLoggedIn);
  // const [activeKey, setActiveKey] = useState("profile");
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // return (
  //   <div>
  //     <h2>Welcome, {userInfo.username}</h2>
  //     {/* Other user info. Example: */}
  //     <p>Email: {userInfo.email}</p>
  //   </div>
  // );
  const [activeKey, setActiveKey] = useState("info");
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
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
              {/* <button
                        onClick={() => logout()}
                        className="btn btn-secondary logout-btn"
                      >
                        Logout
                      </button> */}
            </div>
            <div className="d-flex gap-4">
              <CustomButton size="lg" onClick={() => logout()} outline={true}>
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
    </>
  );
};

export default Profile;
