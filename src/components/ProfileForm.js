import React from "react";
import { useState } from "react";
import useAuthContext from "../Hooks/useAuthContext";

const ProfileForm = () => {
    const { user } = useAuthContext();
    // const [userObj, setUserObj] = useState(user ? JSON.parse(user) : "");

    // const handleEdit = (e) => {
    //     e.preventDefault;
    //     console.log("Edit");
    // }

    return (
        <>
            <div>First Name: {user.firstName}</div>
            <div>Last Name: {user.lastName}</div>
            <div>Email: {user.email}</div>
            <div>Profile Photo: {user.photoURL}</div>
            <div>Password: {user.password1}</div>

            {/* <h3>Signup</h3>
                <form onSubmit={handleEdit}>
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
                        id="password1"
                        name="password1"
                        value={signupInfo.password1}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={signupInfo.password2}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <button type="submit" disabled={disabled}>
                        Signup
                    </button>
                </form>
            <p>{error}</p> */}
        </>
    );
};

export default ProfileForm;
