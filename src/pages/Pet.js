import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import useAuthContext from "../Hooks/useAuthContext";
import usePetsListContext from "../Hooks/usePetsListContext";
import Modal from "../components/Modal";
import PetForm from "../components/PetForm";

const Pet = () => {
    const queryStr = window.location.search;
    const urlParams = new URLSearchParams(queryStr);
    const petId = urlParams.get("id");

    const [pet, setPet] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [render, setRender] = useState(false);

    const { savedPetIds, isSaved, setIsSaved } = usePetsListContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = () => {
        setShow(false);
        setRender(!render);
    };

    const adoptOrFoster = async (e) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/pets/adopt/${petId}/${user.id}/${e.target.value}`,
                null,
                {
                    withCredentials: true,
                }
            );
            if (!res.data.ok) throw new Error("Error updating pet status");
            setRender(!render);
        } catch (error) {
            console.log(error);
        }
    };

    const returnPet = async () => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/pets/return/${petId}`,
                null,
                {
                    withCredentials: true,
                }
            );
            if (!res.data.ok) throw new Error("Error updating pet status");
            setRender(!render);
        } catch (error) {
            console.log(error);
        }
    };

    const savePet = async (e) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/pets/save/${petId}/${user.id}`,
                null,
                { withCredentials: true }
            );
            if (!res.data.ok) throw new Error("Error updating pet status");
            setIsSaved(true);
        } catch (error) {
            console.log(error);
        }
    };

    const unSavePet = async (e) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/pets/unsave/${petId}/${user.id}`,
                null,
                {
                    withCredentials: true,
                }
            );
            if (!res.data.ok) throw new Error("Error updating pet status");
            setIsSaved(false);
        } catch (error) {
            console.log(error);
        }
    };

    const messageSet = (pet) => {
        switch (true) {
            case pet.adoptionStatus === "Adopted":
                setMessage("This pet has been adopted");
                break;
            case pet.adoptionStatus === "Fostered":
                setMessage("This pet has been fostered");
                break;
            case pet.adoptionStatus === "Available":
                setMessage("This pet is available for adoption");
                break;
            default:
                setMessage("");
        }
    };

    useEffect(() => {
        let isSubscribed = true;

        const fetchPet = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/pets/${petId}`
            );
            const data = await response.data;
            if (isSubscribed) setPet(data);
            messageSet(data);
            for (const id of savedPetIds) {
                if (id === petId) {
                    setIsSaved(true);
                }
            }
        };

        try {
            fetchPet();
        } catch (error) {
            console.log(error);
        }

        return () => (isSubscribed = false);
    }, [user, savedPetIds, render, petId, setIsSaved]);

    return (
        <>
            {!pet || !message ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {user && user.admin > 0 && (
                        <button type="button" onClick={() => setShow(true)}>
                            Edit Pet
                        </button>
                    )}
                    <div className="pet-container">
                        <img
                            src={pet.picture}
                            width="150"
                            height="150"
                            alt="pet"
                        />
                        <div className="details">
                            <div className="label">Name: {pet.name}</div>
                            <div className="label">Type: {pet.type}</div>
                            <div className="label">Height: {pet.height}</div>
                            <div className="label">Weight: {pet.weight}</div>
                            <div className="label">Color: {pet.color}</div>
                            <div className="label">Bio: {pet.bio}</div>
                            <div className="label">
                                Hypoallergenic: {pet.hypoallergenic}
                            </div>
                            <div className="label">
                                Dietary Restrictions: {pet.dietaryRes}
                            </div>
                            <div className="label">Breed: {pet.breed}</div>
                        </div>
                        <div className="message_container">
                            <div className="message">{message}</div>
                        </div>

                        <div className="changeStatus_buttons">
                            {user && (
                                <>
                                    {pet.adoptionStatus === "Available" && (
                                        <>
                                            <button
                                                type="button"
                                                value="Adopted"
                                                onClick={adoptOrFoster}
                                                className="petButton"
                                            >
                                                Adopt
                                            </button>
                                            <button
                                                type="button"
                                                value="Fostered"
                                                onClick={adoptOrFoster}
                                                className="petButton"
                                            >
                                                Foster
                                            </button>
                                        </>
                                    )}
                                    {pet.ownerId === user.id ? (
                                        <button
                                            type="button"
                                            onClick={returnPet}
                                            value="Available"
                                            className="petButton"
                                        >
                                            Return
                                        </button>
                                    ) : (
                                        <>
                                            {!isSaved ? (
                                                <button
                                                    type="button"
                                                    value="Saved"
                                                    onClick={savePet}
                                                    className="petButton"
                                                >
                                                    Save for Later
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={unSavePet}
                                                    className="petButton"
                                                >
                                                    UnSave Pet
                                                </button>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="footer">
                            {user && (
                                <button
                                    type="button"
                                    onClick={() => navigate("/myPets")}
                                    className="petButton"
                                >
                                    Back MyPets
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="petButton"
                            >
                                Back to Home
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="petButton"
                            >
                                Back
                            </button>
                        </div>

                        {show && (
                            <Modal show={show} onClose={() => setShow(false)}>
                                <PetForm
                                    handleSubmit={handleSubmit}
                                    petData={pet}
                                />
                            </Modal>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Pet;
