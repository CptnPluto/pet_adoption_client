import { useNavigate } from "react-router-dom";
import useSearchContext from "../Hooks/useSearchContext";

const BasicSearch = () => {
    const { handleSearch, handleChange } = useSearchContext();
    const navigate = useNavigate();

    const handleClick = async () => {
        await handleSearch();
        navigate("/search");
    };

    return (
        <div className="search">
            <select name="type" id="searchDropdown" onChange={handleChange}>
                <option value="search" hidden>
                    Search our pets databse!
                </option>
                <option value="all">All</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="reptile">Reptiles</option>
                <option value="small animal">Small Animals</option>
            </select>
            <button type="button" onClick={handleClick}>
                Search
            </button>
        </div>
    );
};

export default BasicSearch;
