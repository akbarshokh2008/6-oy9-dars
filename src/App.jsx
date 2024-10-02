import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layout/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem(token)) {
      setToken(localStorage.getItem("token"));
    } else {
      if (location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, []);
  function PriveteRoute({ isAuthenticadet, children }) {
    if (!isAuthenticadet) {
      navigate("/login");
    }
    return children;
  }
  return (
    <div className="bg-slate-50">
      <Routes>
        <Route
          path="/"
          element={
            <PriveteRoute isAuthenticadet={!!token}>
              <MainLayout>
                <Home />
              </MainLayout>
            </PriveteRoute>
          }
        ></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
