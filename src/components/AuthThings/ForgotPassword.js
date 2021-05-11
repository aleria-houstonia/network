import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px",
            }}
        >
            <form className="login" onSubmit={handleSubmit}>
                <div style={{ textAlign: "center" }}>
                    <h2 className="login-text">Password Reset</h2>
                </div>
                <input
                    className="logemail  login-inp"
                    type="email"
                    ref={emailRef}
                    placeholder="Email"
                />

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button style={{ padding: "8px" }}>Password Reset</button>
                </div>
                <div className="rec">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    );
}
