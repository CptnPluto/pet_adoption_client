//TD: Implement "isSubscribed" everywhere. Not sure how to do this.
import { useEffect } from "react";

import NavButton from "../components/NavButton";
import PetCard from "../components/PetCard";
import usePetsListContext from "../Hooks/usePetsListContext";

const MyPets = () => {
    const { myPets, savedPets, fetchMyPets, fetchSavedPets } =
        usePetsListContext();

    useEffect(() => {
        try {
            fetchMyPets();
            fetchSavedPets();
        } catch (error) {
            console.log(error);
        }
    }, [fetchMyPets, fetchSavedPets]);

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
            {!(savedPets.length) && (
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
