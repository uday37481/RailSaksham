import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import your Dashboard and other components as needed
import Dashboard from "./components/Dashboard"; // Adjust path as needed

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;