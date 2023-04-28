import React from "react";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import JobDetailPage from "./JobDetailPage/JobDetailPage";
import EditJobPage from "./EditJobPage/EditJobPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="jobdetails/:id" element={<JobDetailPage />} />
          <Route path="editJob/:id" element={<EditJobPage />} />
          <Route path="addJob/" element={<EditJobPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
