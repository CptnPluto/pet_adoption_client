import useAuthContext from "../Hooks/useAuthContext";
import BasicSearch from "./BasicSearch";

const Header = () => {

    return (
        <div className="header flex-col">
            <div className="welcome">
                <h1>
                    Adopt a loving companion and make a difference in the life
                    of a homeless animal!
                </h1>
                <BasicSearch />
            </div>
        </div>
    );
};
export default Header;
