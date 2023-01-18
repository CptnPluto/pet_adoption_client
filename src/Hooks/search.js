import { useCallback } from "react";
import axios from "axios";

const useSearch = () => {
    const search = useCallback(async (searchCriteria) => {
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/pets/search`,
            searchCriteria
        );
        const data = response.data;
        return data;
    }, []);

    return { search };
};

export default useSearch;
