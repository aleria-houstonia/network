import React from "react";
import AuthProvider from "./contexts/AuthContext";
import Routes from "./Routes";
import "./App.css";
const App = () => {
    return (
        <div>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </div>
    );
};

export default App;
