import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "../shared/layout";
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import User from "../pages/User";
import Timesheet from "../pages/Timesheet";
import Developer from "../pages/Developer";
import Chatbot from "../modules/Chatbot";
import Organization from "../pages/Organization";
import LoginPage from "../../UIComponents/LoginPage";

const Routers = () => {
  const navigate = useNavigate();
  const storedUserData = localStorage.getItem("user");
  const parsedData = storedUserData ? JSON.parse(storedUserData) : null;

  useEffect(() => {
    if (!parsedData) {
      navigate("/login"); // Redirect to login if no user data
    }
  }, [parsedData, navigate]);

  let userRole = "User";
  let userName = parsedData?.first_name;
  let userID = parsedData?.id;

  if (parsedData?.is_admin) {
    userRole = "Admin";
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <>
            <Layout userRole={userRole} userName={userName} />
            <Chatbot />
          </>
        }
      >
        <Route index element={<Home userName={userName} />} />
        <Route
          path="home"
          element={<Home userName={userName} userID={userID} />}
        />
        <Route path="settings" element={<Setting />} />
        <Route path="users" element={<User />} />
        <Route path="org" element={<Organization />} />
        <Route path="timesheet" element={<Timesheet userID={userID} />} />
        <Route path="dev" element={<Developer />} />
        <Route path="*" element={<Home userName={userName} />} />
      </Route>
    </Routes>
  );
};

export default Routers;
