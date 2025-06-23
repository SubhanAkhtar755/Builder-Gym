import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Toaster } from "sonner";

import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Proteins from "../pages/Proteins.jsx";

import Profile from "../pages/dashboard/Profile.jsx";
import Diet from "../pages/dashboard/Diet.jsx";
import Progress from "../pages/dashboard/Progress.jsx";
import Subscription from "../pages/dashboard/Subscription.jsx";
import Admin from "../pages/dashboard/admin/Admin.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /></>} />
        <Route path="/proteins" element={<><Navbar /><Proteins /></>} />

        {/* Protected Dashboard Routes with Navbar */}
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Profile />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/diet"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Diet />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/progress"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Progress />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/subscription"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Subscription />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Admin />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
