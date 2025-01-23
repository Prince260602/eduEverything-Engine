import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Common/Navbar/Navbar";
// import Hero from "./components/Home/Hero/Hero";
import Home from "./components/Home/Home";
import Footer from "./components/Common/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Admin from "./components/Admin/Admin";
import QnaPage from "./components/Qna-Page/QnaPage";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import McqComponent from "./components/Qna-Page/McqComponent";
import { DataProvider } from "./Context/context";
import { AuthProvider } from "./Context/AuthContext";
import GeneratePDF from "./components/Generate PDF/GeneratePDF";
import Login from "./components/Admin/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/qna-page" element={<QnaPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/qna-page/objectives" element={<McqComponent />} />
            <Route path="/generate-pdf" element={<GeneratePDF />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </DataProvider>
      </AuthProvider>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
