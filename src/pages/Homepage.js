import { useState } from "react";

import Header from "../components/Header";
import Modal from "../components/Modal";
import NavButton from "../components/NavButton";
import AuthForm from "../components/AuthForm";

import useAuthContext from "../Hooks/useAuthContext";

const Homepage = ({ handleSignupButton}) => {
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState(true);
    const { user } = useAuthContext();

   
    return (
        <div className="container">
            <Header
                signUp={() => handleSignupButton()}
            />
            {/* If user is logged in, show My Pets, Profile Settings, and Logout buttons */}

            {!user && (
                <div className="section">
                    <h1 className="content">
                        Not a member?
                        <button type="button" onClick={handleSignupButton} className="home_signup">
                            Sign Up!
                        </button>
                    </h1>
                    </div>
                )}
            {user && (
                <>
                    <div className="section">
                        <div className="content">
                            <h1>See all of your pets!</h1>
                            <NavButton navLink="/myPets">My Pets</NavButton>
                        </div>
                    </div>
                </>
            )}

            {/* If user is not logged in, show Login/Signup button */}
            {!user && (
                <>
                    {show && (
                        <Modal show={show} onClose={() => setShow(false)}>
                            <AuthForm
                                login={login}
                                toggleLoginSignup={() => setLogin(!login)}
                            />
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
};

export default Homepage;

