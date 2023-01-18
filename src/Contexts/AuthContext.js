import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log("LOGIN");
            // localStorage.setItem("USER", JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case "LOGOUT":
            console.log("LOGOUT");
            return { ...state, user: null };
        case "AUTH_IS_READY":
            console.log("AUTH_IS_READY");
            return { ...state, user: action.payload, authIsReady: true };
        case "ERROR":
            console.log("ERROR");
            return { ...state, error: action.payload };
        default:
            console.log("No ACTION");
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem("USER")),
        error: "",
        // token: localStorage.getItem("token") || "",
        authIsReady: false,
    });

    // const { login } = useLogin();
    // const { signup } = useSignup();

    // let isAuthed = state.user ? true : false;

    // TD: Need to implement this on BE.
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     console.log("Token: ", token);
    //     const getUser = async () => {
    //         try {
    //             if (token) {
    //                 const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 });
    //                 console.log("User: ", res.data);
    //                 dispatch({ type: "AUTH_IS_READY", payload: res.data });
    //             } else {
    //                 console.log("no token");
    //                 dispatch({ type: "AUTH_IS_READY", payload: null });
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getUser();
    // }, []);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
                    withCredentials: true,
                });
                console.log("User: ", res.data);
                dispatch({ type: "AUTH_IS_READY", payload: res.data });
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    const login = async (loginInfo) => {
        try {
            // const sendLoginInfo = JSON.stringify(loginInfo);
            console.log("logininfo", loginInfo);
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                loginInfo
            );
            //NEW - NEEDS TESTING
            //ADD TOKEN TO STATE in authContext
            console.log("Returned data: ", res);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }
            dispatch({ type: "LOGIN", payload: res.data.user });
            // add a navigate to home page
        } catch (err) {
            dispatch({ type: "ERROR", payload: err.response.data });
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
