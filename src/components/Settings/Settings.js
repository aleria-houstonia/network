import React from "react";
import ForgotPassword from "../AuthThings/ForgotPassword";
import Login from "../AuthThings/Login";
import Signup from "../AuthThings/Signup";
import UpadateProfile from "../AuthThings/UpdateProfile";
import "./Settings.css";
const Settings = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <ForgotPassword />
            {/* <Login /> */}
            {/* <Signup /> */}
            <UpadateProfile />
        </div>
    );
};

export default Settings;
