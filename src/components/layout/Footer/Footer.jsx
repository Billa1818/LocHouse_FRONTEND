// src/components/layout/Footer/Footer.jsx
import React from "react";
import AdminFooter from "./AdminFooter"; // Assure-toi que ce chemin est correct
import PublicFooter from "./PublicFooter"; // Assure-toi que ce chemin est correct

function Footer({ isAdmin }) {
  if (isAdmin) {
    return <AdminFooter />;
  } else {
    return <PublicFooter />;
  }
}

export default Footer;
