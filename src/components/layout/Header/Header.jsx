// src/components/layout/Header/HeaderWrapper.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import OwnerHeader from "./OwnerHeader";
import AdminHeader from "./HeaderAdmin";

function HeaderWrapper() {
  const location = useLocation();

  // DÉTECTION DU RÔLE PAR LA ROUTE
  if (location.pathname.startsWith("/proprietaire")) {
    return <OwnerHeader />;
  }
  if (location.pathname.startsWith("/admin")) {
    return <AdminHeader />;
  }

  
  return <PublicHeader />;
}

export default HeaderWrapper;