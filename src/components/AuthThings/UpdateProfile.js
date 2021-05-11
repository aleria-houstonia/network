import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setError("Failed to update account");
            })
            .finally(() => {
                setLoading(false);
            });
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
                        <h2 className="login-text"> Update Profile</h2>
                    </div>

                    <input
                        className="logemail  login-inp"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                        defaultValue={currentUser.email}
                    />

                    <input
                        className="logpassword login-inp"
                        type="password"
                        placeholder="Leave blank to keep the same"
                        ref={passwordRef}
                    />

                    <input
                        className="logpassword login-inp"
                        type="password"
                        placeholder="Leave blank to keep the same"
                        ref={passwordConfirmRef}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button style={{ padding: "8px" }}>
                            {" "}
                            Update Profile
                        </button>
                    </div>
                    <div className="rec">
                        <Link to="/">Cancel</Link>
                    </div>
                </form>
                ;
            </div>
        </>
    );
}
