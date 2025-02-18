import { BrowserRouter as Router, Routes, Route } from 
"react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Journal from "./pages/Journal";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}
