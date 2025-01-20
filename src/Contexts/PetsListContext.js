// TD 2025: This whole context probably needs to be redone. I don't think the pets context is necessary - I can just call the API's on necessary page loads
// Can use custom hooks, lift state up and pass down as props, or use Redux for global state management.

import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../Hooks/useAuthContext";
import { useCallback } from "react";

const PetsListContext = createContext();

const PetsListProvider = ({ children }) => {
    const { user } = useAuthContext();

    const [savedPets, setSavedPets] = useState([]);
    const [savedPetIds, setSavedPetIds] = useState([]);
    const [myPets, setMyPets] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const fetchMyPets = useCallback(
        async (userId = user.id) => {
            try {

                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/pets/myPets/${userId}`,
                    { withCredentials: true, }
                );
                return response.data;
            
            } catch (error) {
                console.log(error("Error in fetchMyPets: ", error));
                return [];
            }
        },
        [user]
    );

    const fetchSavedPets = useCallback(
        async (userId = user.id) => {
            try{
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/pets/mySavedPets/${userId}`,
                    { withCredentials: true }
                );
                return response.data;
            
            } catch (error) {
                console.log("Error in fetchSavedPets: ", error);
                return [];
            }
        },
        [user]
    );

    useEffect(() => {
        console.log("useEffect in context");
        const fetchPetLists = async () => {
            const [myPetsResponse, savedPetsResponse] = await Promise.all([
                fetchMyPets(),
                fetchSavedPets(),
            ]);

            if (myPetsResponse.length > 0) {
                console.log("Setting my pets: ", myPetsResponse);
                setMyPets([...myPetsResponse]);
            }

            if (savedPetsResponse.length >= 0) {
                console.log("Setting saved pets: ", savedPetsResponse);
                setSavedPetIds(savedPetsResponse.map((pet) => pet.petId));
                setSavedPets([...savedPetsResponse]);
            }
        };

        fetchPetLists();
    }, [isSaved, fetchMyPets, fetchSavedPets]);

    return (
        <PetsListContext.Provider
            value={{
                myPets,
                setMyPets,
                savedPets,
                setSavedPets,
                setSavedPetIds,
                savedPetIds,
                fetchMyPets,
                fetchSavedPets,
                isSaved,
                setIsSaved,
            }}
        >
            {children}
        </PetsListContext.Provider>
    );
};

export { PetsListContext, PetsListProvider };
