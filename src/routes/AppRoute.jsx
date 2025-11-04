import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/Authentification/LogIn";
import SignIn from "../pages/Authentification/SignIn";
import Error from "../pages/error/Error";
import Details from "../pages/Details";
import Rechercher from "../pages/Rechercher"; // Ajoutez cet import

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} /> {/* EXACTE */}
      <Route path="/rechercher" element={<Rechercher />} /> {/* Ajoutez cette route */}
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Error />} /> {/* La route 404 reste en dernier */}
    </Routes>
  );
}

export default AppRoute;