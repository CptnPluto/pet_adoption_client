import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSearchContext from "../Hooks/useSearchContext";

const BasicSearch = () => {
    const { searchCriteria, handleSearch, handleChange } = useSearchContext();
    const [basicSearchCriteria, setBasicSearchCriteria] = useState("");
    const navigate = useNavigate();

    // const handleChange = async (e) => {
    //     // TD: use searchCriteriaContext to set search criteria
    //     setBasicSearchCriteria(e.target.value);
    //     console.log("basicSearchCriteria", basicSearchCriteria);
    // };

    const handleClick = async () => {
        //TD: use searchCriteriaContext to set search criteria
        console.log("searchCriteria: ", searchCriteria);
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
