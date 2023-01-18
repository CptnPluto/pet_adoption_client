import { useState } from "react";

import Header from "../components/Header";
import Modal from "../components/Modal";
import NavButton from "../components/NavButton";
import AuthForm from "../components/AuthForm";

import useAuthContext from "../Hooks/useAuthContext";

const Homepage = ({handleLoginButton, handleSignupButton, handleLogout, handleSearch}) => {
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState(true);
    const { user } = useAuthContext();

   
    return (
        <div className="container">
            <Header
                login={handleLoginButton}
                signUp={() => handleSignupButton()}
                logout={() => handleLogout()}
                search={() => handleSearch()}
            />
            {/* If user is logged in, show My Pets, Profile Settings, and Logout buttons */}

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

