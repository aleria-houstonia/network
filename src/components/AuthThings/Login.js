import React, { useContext, useRef, useState } from "react";
import { Form, Card, Button, Container, Alert } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";

import "./Auth.css";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../contexts/UsersContext";
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);

            history.push("/");
        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                }}
            >
                <form className="login" onSubmit={handleSubmit}>
                    <div style={{ textAlign: "center" }}>
                        <h2 className="login-text">Login</h2>
                    </div>
                    <input
                        className="logemail  login-inp"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                    />
                    <input
                        className="logpassword login-inp"
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button style={{ width: "80px" }}>Login</button>
                    </div>
                    <div className="rec">
                        <Link to="/forgot-password">Forgot Password?</Link>
                        <br />
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

{
    /* <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        ref={emailRef}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={passwordRef}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    disabled={loading}
                                    className="w-100"
                                    type="submit"
                                >
                                    Log In
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div> */
}
