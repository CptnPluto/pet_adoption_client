import axios from "axios";
import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const signup = async (signupInfo) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/signup`,
                signupInfo
            );
            console.log("Res:", res.data);
            // dispatch({ type: "LOGIN", payload: res.data });
            // add navigate to login page
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
    };
    return { signup, errorMessage };
};

export default useSignup;
