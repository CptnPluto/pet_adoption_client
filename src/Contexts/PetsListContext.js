import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../Hooks/useAuthContext";
import { useCallback } from "react";

const PetsListContext = createContext();

const PetsListProvider = ({ children }) => {
    const { user, token } = useAuthContext();

    const [savedPets, setSavedPets] = useState([]);
    const [savedPetIds, setSavedPetIds] = useState([]);
    const [myPets, setMyPets] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const fetchMyPets = useCallback(
        async (userId = user.id) => {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/pets/myPets/${userId}`,
                {
                    withCredentials: true,
                }
            );
            const data = await response.data;
            return data;
            // if (data.length > 0) {
            //     setMyPets([...data]);
            // }
        },
        [token, user]
    );

    const fetchSavedPets = useCallback(
        async (userId = user.id) => {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/pets/mySavedPets/${userId}`,
                { withCredentials: true }
            );
            const data = await response.data;
            return data;
            // if (data.length > 0) {
            //     setSavedPetIds(data.map((pet) => pet.petId));
            //     setSavedPets([...data]);
            // }
        },
        [token, user]
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
    }, [user, isSaved]);

    return (
        <PetsListContext.Provider
            value={{
                myPets,
                savedPets,
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
