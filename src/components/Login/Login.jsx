import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from '../../api.jsx';
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import {StyledForm} from "../../styles.jsx";
import styles from "./Login.module.css";
import secureTalk from '/be9d282b-e9de-4df7-b4fb-120a2d0f3503.webp'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate("/dashboard");
        },
        onError: (error) => {
            console.log("Error:", error);

            let errorMessage = "An unknown error occurred";

            if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
                // Fehler-Meldungen extrahieren und zu einer Nachricht zusammenfassen
                errorMessage = error.response.data.errors.map(err => err.msg).join(' ');
            } else if (error.message) {
                errorMessage = error.message;
            }

            setErrorMessage(errorMessage);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");
        mutation.mutate({ username, password})
    }

    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.leftPage}>
                <StyledForm onSubmit={handleSubmit}>
                    <h1>EnigmaTalk</h1>
                    {errorMessage && <ErrorMessage message={errorMessage}/>}
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
                    <p>New to EnigmaTalk? <Link className={styles.link} to="/register">Create an account</Link></p>
                </StyledForm>
            </div>
            <div className={styles.rightPage}>
                <img alt="EnigmaLogo" className={styles.secureTalkImage} src={secureTalk}/>
            </div>
        </div>
    )
};

export default Login;