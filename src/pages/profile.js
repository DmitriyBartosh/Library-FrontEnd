import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/privateRoute";

import Index from '../components/profile'

function Profile() {
  return (
    <Router>
      <PrivateRoute path="/profile" component={Index} />
    </Router>
  );
}

export default Profile;