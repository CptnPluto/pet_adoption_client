import React from "react";
import NavButton from "../components/NavButton";
import UserForm from "../components/UserForm";
import useAuthContext from "../Hooks/useAuthContext";

const Profile = () => {
    const { user } = useAuthContext();

    return (
        <div className="profile_page">
            <img src={user.picture} alt="profile" />
            <UserForm />
            <NavButton navLink="/">Back to Homepage</NavButton>
        </div>
    );
};

export default Profile;
