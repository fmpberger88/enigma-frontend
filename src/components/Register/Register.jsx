import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import { register } from "../../api.jsx";
import {Form, Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import SuccessMessage from "../SuccessMesssage/SuccessMessage.jsx";


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            setSuccessMessage("Registration successfull! Redirecting to login");
            setErrorMessage("");
            setTimeout(() => {
                navigate('/');
            }, 5000);
        },
        onError: (error) => {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.map(err => err.msg).join(' '));
            } else {
                setErrorMessage(error.message);
            }
            setSuccessMessage("");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ username, password });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && <SuccessMessage message={successMessage} />}
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
                {mutation.isLoading ? "Loading..." : "Register"}
            </button>
            <p>Already have an Account? Go to <Link to='/'>Login</Link></p>
        </Form>
    )
};

export default Register;