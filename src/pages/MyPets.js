//TD: Implement "isSubscribed" everywhere. Not sure how to do this.
import { useEffect, useCallback } from "react";

import NavButton from "../components/NavButton";
import PetCard from "../components/PetCard";
import usePetsListContext from "../Hooks/usePetsListContext";

const MyPets = () => {
    const {
        myPets,
        setMyPets,
        savedPets,
        setSavedPets,
        setSavedPetIds,
        fetchMyPets,
        fetchSavedPets,
    } = usePetsListContext();

    const fetchPetLists = useCallback(async () => {
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
    }, [fetchMyPets, fetchSavedPets, setMyPets, setSavedPetIds, setSavedPets]);

    useEffect(() => {
        try {
            fetchPetLists();
        } catch (error) {
            console.log(error);
        }
    }, [fetchPetLists]);

    return (
        <div className="mypets-container">
            <h2>My Pets</h2>
            {!myPets && (
                <div className="message">
                    You haven't adopted or fostered any pets, yet!
                </div>
            )}
            <div className="card-container">
                {myPets &&
                    myPets.map((pet) => <PetCard key={pet.petId} pet={pet} />)}
            </div>

            <h2>Saved Pets</h2>
            {!savedPets.length && (
                <div className="message">
                    No saved pets, yet. Save a pet to get started!
                </div>
            )}
            <div className="card-container">
                {savedPets &&
                    savedPets.map((pet) => (
                        <PetCard key={pet.petId} pet={pet} />
                    ))}
            </div>

            <NavButton navLink="/">Back to Homepage</NavButton>
        </div>
    );
};

export default MyPets;
