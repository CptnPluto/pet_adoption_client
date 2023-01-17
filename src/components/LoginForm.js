import "../AppCSS.css";
import { useState, useEffect } from "react";

import useLogin from "../Hooks/login";

const LoginForm = ({ toggleLoginSignup }) => {
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const { login, errorMessage } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(loginInfo);
        setError(errorMessage);
    };

    const handleInputChange = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value,
        });
    };

    // Upon receiving an errorMessage from login, setError.
    useEffect(() => {
        setError(errorMessage);
        console.log("setting error: ", errorMessage);
    }, [errorMessage]);

    // Enable submit if all fields have entries.
    useEffect(() => {
        const enableSubmit = () => {
            if (loginInfo.email && loginInfo.password) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        };
        enableSubmit();
    }, [loginInfo]);

    return (
        <>
            <div className="login">
                <h3>Login</h3>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={loginInfo.email}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginInfo.password}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <button type="submit" disabled={disabled}>
                        Login
                    </button>
                </form>
            </div>

            <p>{error}</p>
            <div className="switch">
                <p>Not yet a member?</p>
                <button type="button" onClick={toggleLoginSignup}>
                    Sign Up!
                </button>
            </div>
        </>
    );
};

export default LoginForm;
