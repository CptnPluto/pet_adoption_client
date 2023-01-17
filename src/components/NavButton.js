import React from "react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ children, navLink, params }) => {
    const navigate = useNavigate();
    const goToPage = () => {
        navigate(
            // navLink, {
            //     state: {
            //         id: params,
            //     }
            // }
            {
                pathname: navLink,
                search: params && `?id=${params}`,
            }
        );
    };
    return (
        <button type="button" onClick={goToPage}>
            {children}
        </button>
    );
};

export default NavButton;
