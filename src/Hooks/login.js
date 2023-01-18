import axios from "axios";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState("");

    const login = async (loginInfo) => {
        try {
            // const sendLoginInfo = JSON.stringify(loginInfo);
            console.log("logininfo", loginInfo);
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                loginInfo,
                { withCredentials: true }
            );
            //NEW - NEEDS TESTING
            //ADD TOKEN TO STATE in authContext
            console.log("Returned data: ", res);
            if (res.data.ok) {
                dispatch({ type: "LOGIN", payload: res.data.user });
            }

            // add a navigate to home page
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
    };
    return { login, errorMessage };
};

export default useLogin;
