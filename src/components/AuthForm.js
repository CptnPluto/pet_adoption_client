import "../AppCSS.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = ({ login, toggleLoginSignup }) => {
    const handleLogin = () => {
        console.log("Login");
    };

    const handleSignup = () => {
        console.log("Signup");
    };

    return (
        <>
            {login ? (
                <LoginForm
                    handleLogin={handleLogin}
                    toggleLoginSignup={toggleLoginSignup}
                />
            ) : (
                <SignupForm
                    handleSignup={handleSignup}
                    toggleLoginSignup={toggleLoginSignup}
                />
            )}
        </>
    );
};

export default AuthForm;
