import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import { register } from "../../api.jsx";
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import SuccessMessage from "../SuccessMesssage/SuccessMessage.jsx";
import {StyledForm} from "../../styles.jsx";
import styles from "./Register.module.css";
import secureTalk from '/be9d282b-e9de-4df7-b4fb-120a2d0f3503.webp'


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
        <div className={styles.landingPageContainer}>
            <div className={styles.leftPage}>
                <StyledForm onSubmit={handleSubmit}>
                    <h1>EnigmaTalk</h1>
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
                    <p>Already have an Account? Go to <Link className={styles.link} to='/'>Login</Link></p>
                </StyledForm>
            </div>
            <div className={styles.rightPage}>
                <img alt="EnigmaLogo" className={styles.secureTalkImage} src={secureTalk} />
            </div>
        </div>
    )
};

export default Register;