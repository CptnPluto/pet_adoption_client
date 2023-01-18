import useAuthContext from "../Hooks/useAuthContext";
import BasicSearch from "./BasicSearch";

const Header = ({ signUp }) => {
    const { user } = useAuthContext();

    return (
        <div className="header flex-col">
            <div className="welcome">
                <h1>
                    Adopt a loving companion and make a difference in the life
                    of a homeless animal!
                </h1>
                {!user && (
                    <h3>
                        Not a member?
                        <button type="button" onClick={() => signUp()}>
                            Sign Up!
                        </button>
                    </h3>
                )}
                <BasicSearch />
            </div>
        </div>
    );
};
export default Header;
