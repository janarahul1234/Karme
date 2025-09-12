import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import ThemeProvider from "@/context/themeContext";
import UserProvider from "@/context/userContext";

import { Toaster } from "@/components/ui/sonner";
import PublicRoutes from "@/components/PublicRoutes";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import AuthLayout from "@/components/layouts/AuthLayout";
import AppLayout from "@/components/layouts/AppLayout";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Home from "@/pages/dashboard/Home";
import Goals from "@/pages/dashboard/Goals";
import Finances from "@/pages/dashboard/Finances";

const GoogleAuthWrapper = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIEND_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Login />
    </GoogleOAuthProvider>
  );
};

const Index = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <ThemeProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<GoogleAuthWrapper />} />
                </Route>
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/finances" element={<Finances />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
