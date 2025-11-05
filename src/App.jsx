import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer"; // Assure-toi que le chemin est correct pour le footer unifié
import AppRoute from "./routes/AppRoute";

function AppWrapper() {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  const isAdmin = isAuthenticated && user && user.role === "admin";

  const hideOnTheseRoutes = ["/login", "/signin"];
  const shouldHideLayout = hideOnTheseRoutes.includes(location.pathname);

  // Si on est en train de charger l'état d'authentification, on ne rend rien ou un loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Chargement...
      </div>
    );
  }

  return (
    <>
      {/* Le header et le footer seront rendus si shouldHideLayout est false */}
      {!shouldHideLayout && <Header isAdmin={isAdmin} />}
      <AppRoute />
      {!shouldHideLayout && <Footer isAdmin={isAdmin} />}{" "}
      {/* Passer isAdmin au Footer */}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;
