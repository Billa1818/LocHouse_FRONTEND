import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Authentification/LogIn";
import SignIn from "../pages/Authentification/SignIn";
import Error from "../pages/error/Error404";
import Details from "../pages/Details";
import Rechercher from "../pages/Rechercher";
import ProprietairePage from "../pages/Proprietaire";
import PaiementPage from "../pages/PaiementPage";
function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/rechercher" element={<Rechercher />} />
      <Route path="/proprietaires" element={<ProprietairePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
    <Route path="/paiement" element={<PaiementPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRoute;