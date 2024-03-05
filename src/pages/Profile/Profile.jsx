import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Nav, Card, Image, Button } from "react-bootstrap";
import AddressesMapped from "../../components/AddressMapped";
import "./profile.css";

const Profile = () => {
  const { isLoggedIn, userInfo, logout } = useContext(UserContext);
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

  return (
    <Container fluid className="pt-3 mt-5">
      <Row className="justify-content-center" style={{ minHeight: "700px" }}>
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
            {/* Add more sections as needed */}
          </Nav>
        </Col>
        <Col md={9} className="profile-content">
          {activeKey === "info" && (
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={4} className="text-center">
                    <Image
                      src="https://via.placeholder.com/150"
                      roundedCircle
                      className="profile-image"
                    />{" "}
                    {/* Placeholder - add your image logic */}
                  </Col>
                  <Col sm={8}>
                    <h2>Profile Details</h2>
                    <p>
                      <strong>Full Name: </strong> {userInfo.firstName}{" "}
                      {userInfo.lastName}
                    </p>
                    <p>
                      <strong>Email: </strong> {userInfo.email}
                    </p>
                    <p>
                      <strong>Mobile Number:</strong> {userInfo.mobileNumber}{" "}
                      {/* Assuming you have this in userInfo */}
                    </p>
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
