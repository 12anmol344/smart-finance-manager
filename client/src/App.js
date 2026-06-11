import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/profile"
  element={<Profile />}
/>
<Route
  path="/reports"
  element={<Reports />}
/>

        <Route
  path="/transaction"
  element={<Transaction />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;