import React from "react";
import PublicHeader from "./PublicHeader";
import AdminHeader from "./HeaderAdmin";

function Header({ isAdmin }) {
  if (isAdmin) {
    return <AdminHeader />;
  } else {
    return <PublicHeader />;
  }
}

export default Header;
