import React from "react";
import Header from "./header";

function Layout({ children }) {
  return <main><Header />{children}</main>;
}

export default Layout;
