import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Authentification/LogIn";
import SignIn from "../pages/Authentification/SignIn";
import Error from "../pages/error/Error404";
import Details from "../pages/Details";
import Rechercher from "../pages/Rechercher";
import ProprietairePage from "../pages/Proprietaire";
import PaiementPage from "../pages/PaiementPage";
import AdminDashboard from "../pages/AdminDasboard";
import UserManagement from "../components/admin/UserAdmin";
import Verification from "../components/admin/Verification";
import Announcements from "../components/admin/Annoncement";

function AppRoute() {
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/rechercher" element={<Rechercher />} />
        <Route path="/proprietaires" element={<ProprietairePage />} />
            <Route path="/paiement" element={<PaiementPage />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        {/* Admin */}
        <Route path="//admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/admin/verifications" element={<Verification />} />
        {/* 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default AppRoute;
