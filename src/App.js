//TD: Make profile, mypets, pet, addpet, dashboard private routes
//TD: Make profile form and signup form use the same component
//UPDATE: Made two forms, and combined into Auth. May adjust in the future.

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import MyPets from "./pages/MyPets";
import Pet from "./pages/Pet";
import Search from "./pages/Search";
import Modal from "./components/Modal";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";
import useAuthContext from "./Hooks/useAuthContext";
import AdminDash from "./admin/AdminDash";
import {
    PrivateAdminRoute,
    PrivateUserRoute,
} from "./routes/AuthedRoutes";

import "./AppCSS.css";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
    const { user, authIsReady, dispatch } = useAuthContext();
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();

    // need to add new method to logout - remove localStorage
    const handleLogout = async () => {
        dispatch({ type: "LOGOUT" });
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/logout`, {withCredentials: true});
        setShow(false);
        // setUser(false);
        console.log("Logout");
    };

    const handleLoginButton = () => {
        console.log("login button clicked");
        setLogin(true);
        setShow(true);
    };

    const handleSignupButton = () => {
        setLogin(false);
        setShow(true);
    };

    const handleSearch = () => {
        //TD: use searchCriteriaContext to set search criteria
        console.log("search button clicked");
        navigate("/search");
    };

    return (
        <>
            {authIsReady && (
                <>
                    <Navbar login={handleLoginButton} logout={handleLogout} />
                    <div className="body">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Homepage
                                        handleLoginButton={handleLoginButton}
                                        handleSignupButton={handleSignupButton}
                                        handleLogout={handleLogout}
                                        handleSearch={handleSearch}
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateUserRoute>
                                        <Profile />
                                    </PrivateUserRoute>
                                }
                            />
                            <Route
                                path="/mypets"
                                element={
                                    <PrivateUserRoute>
                                        <MyPets />
                                    </PrivateUserRoute>
                                }
                            />
                            <Route path="/pets" element={<Pet />} />
                            <Route path="/search" element={<Search />} />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateAdminRoute>
                                        <AdminDash />
                                    </PrivateAdminRoute>
                                }
                            />
                        </Routes>
                        {!user && (
                            <>
                                {show && (
                                    <Modal
                                        show={show}
                                        onClose={() => setShow(false)}
                                    >
                                        <AuthForm
                                            login={login}
                                            toggleLoginSignup={() =>
                                                setLogin(!login)
                                            }
                                        />
                                    </Modal>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default App;
