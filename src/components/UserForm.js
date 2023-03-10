import "./UserForm.css";
import { useState, useEffect } from "react";

import useSave from "../Hooks/save";
import useValidation from "../Hooks/formValidation";
import useAuthContext from "../Hooks/useAuthContext";
import axios from "axios";

const UserForm = ({ type }) => {
    const { user, dispatch } = useAuthContext();
    const [disabled, setDisabled] = useState(true);
    const [show, setShow] = useState(false);
    const [render, setRender] = useState(false);
    const [passChangeDisabled, setPassChangeDisabled] = useState(true);
    const [error, setError] = useState("");
    const [editInfo, setEditInfo] = useState({
        ...user,
    });
    const [isLoading, setIsLoading] = useState(false);

    const [changePass, setChangePass] = useState({
        oldPass: "",
        newPass: "",
        confirmPass: "",
    });
    const { save } = useSave();
    const { editFormValidation, valErrorMessage } = useValidation();

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // const formData = new FormData();
            // for (let key in editInfo) {
            //     formData.append(key, editInfo[key]);
            // }
            setIsLoading(true);
            editFormValidation(editInfo);
            setError(valErrorMessage);

            const res = await save(editInfo);
            if (res.ok) {
                dispatch({ type: "UPDATE_USER", payload: editInfo });
                setRender(!render);
            }
            setIsLoading(false);
        } catch (error) {
            console.log("setting error: ", error);
            setError("Error saving: " + error.response.data);
        }
    };

    const uploadPhoto = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            for (let key in editInfo) {
                formData.append(key, editInfo[key]);
            }
            await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/users/uploadPhoto`,
                formData,
                { withCredentials: true }
            );
            setRender(!render);
            setIsLoading(false);
        } catch (error) {
            console.log("setting error: ", error);
            setError("Error saving: " + error.response);
        }
    };

    const handleInputChange = (e) => {
        if (e.target.name === "picture") {
            console.log("picture: ", e.target.files[0]);
            setEditInfo({
                ...editInfo,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setEditInfo({
                ...editInfo,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handlePassChange = (e) => {
        setChangePass({
            ...changePass,
            [e.target.name]: e.target.value,
        });
    };

    const handlePassSubmit = async (e) => {
        e.preventDefault();

        if (changePass.newPass === changePass.confirmPass) {
            try {
                setIsLoading(true);
                user.password = changePass.oldPass;
                user.newPass = changePass.newPass;
                await axios.put(
                    `${process.env.REACT_APP_SERVER_URL}/users/changePass`,
                    user,
                    { withCredentials: true }
                );
                resetFields();
                setError("");
                setShow(false);
                setIsLoading(false);
            } catch (error) {
                console.log("setting error: ", error);
                setError("Error changing password: " + error.response.data);
            }
        } else {
            console.log("Passwords do not match");
            setError("Passwords do not match");
        }
    };

    const resetFields = () => {
        setChangePass({
            oldPass: "",
            newPass: "",
            confirmPass: "",
        });
    };

    useEffect(() => {
        const enableSubmit = () => {
            if (editInfo.email && editInfo.firstName && editInfo.lastName) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
            if (
                changePass.oldPass &&
                changePass.newPass &&
                changePass.confirmPass &&
                changePass.newPass.length >= 6
            ) {
                setPassChangeDisabled(false);
            } else {
                setPassChangeDisabled(true);
            }
        };
        enableSubmit();
    }, [editInfo, changePass]);

    return (
        <>
            <div className="userForm">
                <h3>{type}</h3>
                <form onSubmit={handleSave}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={editInfo.firstName}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={editInfo.lastName}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={editInfo.email}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="phone_num">Phone Number</label>
                    <input
                        type="text"
                        id="phone_num"
                        name="phone_num"
                        value={editInfo.phone_num || ""}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="bio">Add a Bio!</label>
                    <textarea
                        name="bio"
                        id="bio"
                        cols="30"
                        rows="10"
                        onChange={handleInputChange}
                        value={editInfo.bio}
                    ></textarea>

                    <button type="submit" disabled={disabled || isLoading}>
                        Save Changes
                    </button>
                </form>

                <div className="add_photo">
                    <form className="photoForm">
                        <label htmlFor="picture">Add a Profile Picture</label>
                        <input
                            type="file"
                            accept="img/*"
                            name="picture"
                            id="picture"
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            onClick={uploadPhoto}
                            disabled={isLoading}
                        >
                            Upload Photo
                        </button>
                    </form>
                </div>

                <div className="edit_pass">
                    <button type="button" onClick={() => setShow(!show)}>
                        Change Password
                    </button>
                    {show && (
                        <form className="changePass">
                            <label htmlFor="oldPass">Old Password</label>
                            <input
                                type="password"
                                name="oldPass"
                                id="oldPass"
                                value={changePass.oldPass}
                                onChange={(e) => handlePassChange(e)}
                            />
                            <label htmlFor="newPass">New Password</label>
                            <input
                                type="password"
                                id="newPass"
                                name="newPass"
                                value={changePass.newPass}
                                onChange={(e) => handlePassChange(e)}
                            />
                            <label htmlFor="confirmPass">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPass"
                                name="confirmPass"
                                value={changePass.confirmPass}
                                onChange={(e) => handlePassChange(e)}
                            />
                            <button
                                type="submit"
                                disabled={passChangeDisabled || isLoading}
                                onClick={handlePassSubmit}
                            >
                                Change Password
                            </button>
                        </form>
                    )}
                </div>

                <p>{error}</p>
            </div>
        </>
    );
};
export default UserForm;
