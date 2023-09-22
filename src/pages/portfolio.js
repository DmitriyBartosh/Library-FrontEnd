import React from "react";
import PrivateRoute from "../components/privateRoute";

import Index from "../components/profile/index";

function Profile() {
  return <PrivateRoute path="/portfolio/" component={Index} />;
}

export default Profile;
