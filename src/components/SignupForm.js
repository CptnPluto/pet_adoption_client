import "../AppCSS.css";
import { useState, useEffect } from "react";

import useSignup from "../Hooks/signup";
import useValidation from "../Hooks/formValidation";

const SignupForm = ({ toggleLoginSignup }) => {
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [signupInfo, setSignupInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [password2, setPassword2] = useState("");
    const { signup, errorMessage } = useSignup();
    const { signupFormValidation, valErrorMessage } = useValidation();

    const handleSignup = async (e) => {
        e.preventDefault();
        signupFormValidation(signupInfo, password2);
        await signup(signupInfo);
        toggleLoginSignup();
    };

    const handleInputChange = (e) => {
        setSignupInfo({
            ...signupInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handlePassConf = (e) => {
        setPassword2(e.target.value);
    };

    useEffect(() => {
        const enableSubmit = () => {
            if (
                signupInfo.email &&
                signupInfo.firstName &&
                signupInfo.lastName &&
                signupInfo.password &&
                password2
            ) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        };
        enableSubmit();
    }, [signupInfo, password2]);

    useEffect(() => {
        setError(errorMessage || valErrorMessage);
    }, [errorMessage, valErrorMessage]);

    return (
        <>
            <div className="authform">
                <h3>Signup</h3>
                <form onSubmit={handleSignup}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={signupInfo.firstName}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={signupInfo.lastName}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={signupInfo.email}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={signupInfo.password}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={(e) => handlePassConf(e)}
                    />

                    <button type="submit" disabled={disabled}>
                        Signup
                    </button>
                </form>
                <p className="error">{error}</p>
                <div className="switch">
                    <p>Already have an account?</p>
                    <button type="button" onClick={toggleLoginSignup}>
                        Login!
                    </button>
                </div>
            </div>
        </>
    );
};
export default SignupForm;
