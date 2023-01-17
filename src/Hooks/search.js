import { useState, useCallback } from "react";
import axios from "axios";

const useSearch = () => {
    // const [pets, setPets] = useState([]);

    const search = useCallback(async (searchCriteria) => {
        console.log("in search hook", searchCriteria);
        const response = await axios.post(
            "http://localhost:8080/pets/search",
            searchCriteria
        );
        const data = response.data;
        return data;
    }, []);

    return { search };
};

export default useSearch;
