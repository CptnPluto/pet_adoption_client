import { createContext } from "react";
import { useState } from "react";
import useSearch from "../Hooks/search";

const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const { search } = useSearch();
    const [petsList, setPetsList] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        name: "",
        type: "",
        breed: "",
        height: [],
        weight: [],
        color: "",
        hypoallergenic: false,
        dietary: "",
        adoptionStatus: "",
    });

    const handleSearch = async () => {
        console.log("handleSearch", searchCriteria);
        const res = await search(searchCriteria);
        setPetsList(res);
    };

    const handleChange = async (e) => {
        console.log("handleChange", e);
        if (Object.keys(e).length === 2) {
            setSearchCriteria({
                ...searchCriteria,
                ...e,
            });
        } else {
            setSearchCriteria({
                ...searchCriteria,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <SearchContext.Provider
            value={{
                searchCriteria,
                setSearchCriteria,
                petsList,
                handleSearch,
                handleChange,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchContextProvider };
