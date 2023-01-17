import { SearchContext } from "../Contexts/SearchContext";
import { useContext } from "react";

//------------------//

const useSearchContext = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw Error("useSearchContext must be within a SearchContextProvider");
    }

    return context;
};

export default useSearchContext;
