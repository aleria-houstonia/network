import React, { useRef, useState, useContext } from "react";
import { Form, Card, Button, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { userContext } from "../../contexts/UsersContext";
const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { getUser } = useContext(userContext);
    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            await getUser(
                emailRef.current.value,
                passwordRef.current.value,
                nameRef.current.value
            );
            history.push("/");
        } catch {
            setError("Failed to create an account");
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
                    <h2 className="login-text">Sign Up</h2>
                </div>
                <input
                    className="logemail  login-inp"
                    type="text"
                    placeholder="Name"
                    ref={nameRef}
                />
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

                <input
                    className="logpassword login-inp"
                    type="password"
                    placeholder="Password Confirmation"
                    ref={passwordConfirmRef}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button style={{ padding: "8px" }}>Sign Up</button>
                </div>
                <div className="rec">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </form>
            ;
        </div>
    );
};

export default SignUp;

{
    /* <Container
style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}}
>
<div className="w-100" style={{ maxWidth: "400px" }}>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={nameRef}
                        required
                    />
                </Form.Group>
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
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                        type="password"
                        ref={passwordConfirmRef}
                        required
                    />
                </Form.Group>
                <Button
                    disabled={loading}
                    className="w-100"
                    type="submit"
                >
                    Sign Up
                </Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
    </div>
</div>
</Container> */
}
