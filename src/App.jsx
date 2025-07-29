import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UsersList from "./pages/UsersList";
import UserDetails from "./pages/UserDetails";
import UpdatePass from "./pages/UpdatePass";
import UploadFile from "./pages/UploadFile";
import ViewFile from "./pages/ViewFile";
import Dashboard from "./pages/Dashboard";

function PrivateRoute({ children }) {
  const isAuth = !!localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/" && location.pathname !== "/register";
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
        <Route path="/userid/:id" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><UploadFile /></PrivateRoute>} />
        <Route path="/viewfile" element={<PrivateRoute><ViewFile /></PrivateRoute>} />
        <Route path="/updatepass" element={<PrivateRoute><UpdatePass /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;