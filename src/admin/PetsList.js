import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavButton from "../components/NavButton";

const PetsList = ({ render }) => {
    const [pets, setPets] = useState([]);

    const fetchPets = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/pets`,
                {
                    withCredentials: true,
                }
            );
            setPets(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePet = async (id) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/pets/${id}`,
                {
                    withCredentials: true,
                }
            );
            const newPets = pets.filter((pet) => pet.petId !== id);
            setPets(newPets);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPets();
    }, [render]);

    return (
        <>
            <h3 className="title">Pets List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Details</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.length > 0 &&
                        pets.map((pet) => {
                            {if (pet && pet.picture.startsWith("https://cataas.com//cat")) {
                                pet.picture = pet.picture.replace("https://cataas.com//cat", "https://cataas.com/cat");
                            }}
                              return(  
                                <tr className="entry" key={pet.petId}>
                                    <td>
                                        <img src={pet.picture} alt={pet.name} />
                                    </td>
                                    <td>{pet.name}</td>
                                    <td>{pet.breed}</td>
                                    <td>
                                        <NavButton
                                            navLink="/pets"
                                            params={pet.petId}
                                        >
                                            View Details
                                        </NavButton>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => deletePet(pet.petId)}
                                        >
                                            Delete Pet
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};

export default PetsList;
