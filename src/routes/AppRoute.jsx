import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/Authentification/LogIn";
import SignIn from "../pages/Authentification/SignIn";
import Error from "../pages/error/Error";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default AppRoute;
