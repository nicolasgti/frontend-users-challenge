// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from "./components/SplashScreen";
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoadingScreen from './pages/LoadingScreen';
import PrivateRoute from "./routes/PrivateRoute";
import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage";
import UserFormPage from "./pages/UserFormPage";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 segundos para animação + espera

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={
          <div className="w-screen h-screen">
            {showSplash ? <SplashScreen /> : <LoginPage />}
          </div>}  />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route path="/usuarios/novo" element={
          <PrivateRoute>
            <UserFormPage />
          </PrivateRoute>}
        />
        <Route path="/usuarios/editar/:id" element={
          <PrivateRoute>
            <UserFormPage />
          </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}