import axios from "axios";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSave = () => {
    const { token } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState("");

    const save = async (savedInfo) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/users/edit`,
                savedInfo,
                { withCredentials: true }
            );
            return res.data;
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
    };
    return { save, errorMessage };
};

export default useSave;
