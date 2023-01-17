import useAuthContext from "../Hooks/useAuthContext";
import BasicSearch from "./BasicSearch";

const Header = ({ login, logout, signUp, search }) => {
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
                {/* <div className="search">
                    <select
                        name="searchDropdown"
                        id="searchDropdown"
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="search" hidden>
                            Search our animal database!
                        </option>
                        <option value="dogs">Dogs</option>
                        <option value="cats">Cats</option>
                        <option value="birds">Birds</option>
                        <option value="reptiles">Reptiles</option>
                        <option value="small animals">Small Animals</option>
                    </select>
                    <button
                        type="button"
                        onClick={search}
                        animal={basicSearchCriteria}
                    >
                        Search
                    </button>
                </div> */}
            </div>
        </div>
    );
};
export default Header;
