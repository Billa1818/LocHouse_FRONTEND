import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Authentification/LogIn";
import SignIn from "../pages/Authentification/SignIn";
import Error from "../pages/error/Error404";
import Details from "../pages/Details";
<<<<<<< HEAD
import Rechercher from "../pages/Rechercher"; // Ajoutez cet import
=======
import ProprietairePage from "../pages/Proprietaire";
>>>>>>> b898d8e (Lochouse)

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
<<<<<<< HEAD
      <Route path="/details/:id" element={<Details />} /> {/* EXACTE */}
      <Route path="/rechercher" element={<Rechercher />} /> {/* Ajoutez cette route */}
      <Route path="/login" element={<LogIn />} />
=======
      <Route path="/proprietaires" element={<ProprietairePage /> } />
      <Route path="*" element={<Error />} />
      <Route path="/login" element={<Login />} />
>>>>>>> b898d8e (Lochouse)
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Error />} /> {/* La route 404 reste en dernier */}
    </Routes>
  );
}

export default AppRoute;