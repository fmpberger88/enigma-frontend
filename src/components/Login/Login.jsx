import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from '../../api.jsx';
import {Form, Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            navigate("/dashboard");
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        mutation.mutate({ username, password})
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {error && <ErrorMessage error={error} />}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Loggin in..." : "Login"}
            </button>
            <p>No Account yet? Go to <Link to="/register">Registration</Link></p>
        </Form>
    )
};

export default Login;