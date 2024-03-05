import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { Tabs, Tab, Card, Button, Container, Row, Col } from "react-bootstrap";
import AddressesMapped from "../../components/AddressMapped";
import "./profile.css";

const Profile = () => {
  const { isLoggedIn, userInfo, logout } = useContext(UserContext);
  console.log("yo" + userInfo + isLoggedIn);
  const [activeKey, setActiveKey] = useState("profile");
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
  return (
    <Container fluid className="pt-3 mt-5">
      <Row className="justify-content-center" style={{ minHeight: "700px" }}>
        <Col md={4}>
          <Card className="profile-card">
            <Card.Body>
              <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                <Tab eventKey="profile" title="Profile">
                  <h2>Profile Details</h2>
                  <p>
                    <strong>Full Name: </strong> {userInfo.firstName}{" "}
                    {userInfo.lastName}
                  </p>
                  <p>
                    <strong>Email: </strong> {userInfo.email}
                  </p>
                  <Button variant="secondary" onClick={logout}>
                    Logout
                  </Button>
                </Tab>
                <Tab eventKey="addresses" title="Addresses">
                  <h2>Addresses</h2>
                  <AddressesMapped />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
