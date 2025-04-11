import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserLogin } from "./pages/UserLogin";
import { UserSignup } from "./pages/UserSignup";
import { CaptionLogin } from "./pages/CaptionLogin";
import { CaptionSignup } from "./pages/CaptionSignup";
import HomeUser from "./pages/HomeUser";
import HomeDriver from "./pages/HomeDriver";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-user" element={<HomeUser />} />
        <Route path="/home-driver" element={<HomeDriver />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptionLogin />} />
        <Route path="/captain-signup" element={<CaptionSignup />} />
      </Routes>{" "}
    </div>
  );
};

export default App;
