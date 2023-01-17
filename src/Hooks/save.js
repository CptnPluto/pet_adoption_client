import axios from "axios";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSave = () => {
    const { token } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState("");

    const save = async (savedInfo) => {
        try {
            const res = await axios.put(
                `http://localhost:8080/users/edit`,
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
