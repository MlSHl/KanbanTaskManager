import "./App.css";
import BoardPage from "./pages/BoardPage/BoardPage";
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() =>{
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/board"/> : <LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/board"/> : <RegisterPage/>} />

        <Route path="/board" element={isAuthenticated ? <BoardPage setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login"/>} />

        <Route path="*" element={<Navigate to="/login"/>} />
      </Routes>
    </Router>

  );
}

export default App;
