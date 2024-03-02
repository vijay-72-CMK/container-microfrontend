import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  console.log("yo" + userInfo);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  return (
    <div>
      <h2>Welcome, {userInfo.username}</h2>
      {/* Other user info. Example: */}
      <p>Email: {userInfo.email}</p>
    </div>
  );
};

export default Profile;
