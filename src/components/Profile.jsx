import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { Tabs, Tab, Card, Button } from "react-bootstrap";
import { AddressesMapped } from "./AddressMapped";
const Profile = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  console.log("yo" + userInfo + isLoggedIn);
  const [activeKey, setActiveKey] = useState("profile");
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  // return (
  //   <div>
  //     <h2>Welcome, {userInfo.username}</h2>
  //     {/* Other user info. Example: */}
  //     <p>Email: {userInfo.email}</p>
  //   </div>
  // );
  return (
    <div className="container pt-3">
      <Card>
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
              <Button variant="secondary">Logout</Button>
            </Tab>
            <Tab eventKey="addresses" title="Addresses">
              <h2>Addresses</h2>
              <AddressesMapped userInfo={userInfo} /> Pass userInfo as a prop
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
