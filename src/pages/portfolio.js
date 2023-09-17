import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/privateRoute";

import Main from "../components/profile/index";

function Profile() {
  return (
    <Router>
      <PrivateRoute path="/portfolio/" component={Main} />
    </Router>
  );
}

export default Profile;
