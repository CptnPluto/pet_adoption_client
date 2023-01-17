import React from "react";
import NavButton from "./NavButton";
import useAuthContext from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ login, logout }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <h2 onClick={() => navigate("/")}>
                Confusing Title Pet Adoption Agency
            </h2>
            <h2 className="greeting">
                Welcome {user ? user.firstName : "Guest"}!
                {user && (
                    <>
                        <NavButton navLink="/profile">My Profile</NavButton>
                        {(user.admin > 0) && (
                            <NavButton navLink="/admin">Admin Dash</NavButton>
                        )}
                    </>
                )}
                <button type="button" onClick={user ? logout : login}>
                    {user ? "Log Out" : "Sign In"}
                </button>
            </h2>
        </div>
    );
};

export default Navbar;
