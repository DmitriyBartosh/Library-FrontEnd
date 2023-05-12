import React from "react";
import { main } from "../styles/main.module.scss";

function Layout({ children }) {
  return <main className={main}>{children}</main>;
}

export default Layout;
