import React from "react";
import Index from "../components/profile/index";
import PrivateRoute from "../components/privateRoute";

function Profile() {
  return <PrivateRoute path="/profile" component={Index} />;
}

export default Profile;
