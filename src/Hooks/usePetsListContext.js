import { PetsListContext } from "../Contexts/PetsListContext";
import { useContext } from "react";

//------------------//

const usePetsListContext = () => {
    const context = useContext(PetsListContext);

    if (!context) {
        throw Error(
            "usePetsListContext must be within an PetsListContextProvider"
        );
    }

    return context;
};

export default usePetsListContext;
