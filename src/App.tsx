import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/UI/Header/Header";
import { MainPage } from "./pages/MainPage/MainPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { useAuth } from "./authContext";

export const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <MainPage /> : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/auth/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/auth/registration"
            element={
              isAuthenticated ? <Navigate to="/" /> : <RegistrationPage />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/auth/login" />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
