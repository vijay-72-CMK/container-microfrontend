import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Nav, Card, Image, Button } from "react-bootstrap";
import AddressesMapped from "../../components/AddressMapped";
import "./profile.css";

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
    <Container fluid className="pt-3 mt-5">
      <Row className="justify-content-center" style={{ minHeight: "400px" }}>
        <Col md={3} className="profile-sidebar">
          <Nav
            variant="pills"
            className="flex-column"
            activeKey={activeKey}
            onSelect={(k) => setActiveKey(k)}
          >
            <Nav.Item>
              <Nav.Link eventKey="info">Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="addresses">Addresses</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9} className="profile-content">
          {activeKey === "info" && (
            <Card>
              <Card.Body>
                <Row className="info-section-row">
                  <Col sm={4} className="text-center">
                    {userImage ? (
                      <Image
                        src={userImage}
                        roundedCircle
                        className="profile-image"
                      />
                    ) : (
                      <Image
                        src="https://via.placeholder.com/150"
                        roundedCircle
                        className="profile-image"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Col>

                  <Col sm={5}>
                    <h2>User details</h2>
                    <div className="profile-info-row">
                      <div>
                        <p>
                          <strong>Full Name: </strong> {userInfo.firstName}{" "}
                          {userInfo.lastName}
                        </p>
                        <p>
                          <strong>Email: </strong> {userInfo.email}
                        </p>
                        <p>
                          <strong>Mobile Number:</strong>{" "}
                          {userInfo.mobileNumber}{" "}
                        </p>
                      </div>
                      {/* <button
                        onClick={() => logout()}
                        className="btn btn-secondary logout-btn"
                      >
                        Logout
                      </button> */}
                    </div>
                  </Col>
                  <Col sm={2}>
                    <button
                      onClick={() => logout()}
                      className="btn btn-secondary logout-btn"
                    >
                      Logout
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
          {activeKey === "addresses" && (
            <Card>
              <Card.Body>
                <h2>Addresses</h2>
                <AddressesMapped />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
