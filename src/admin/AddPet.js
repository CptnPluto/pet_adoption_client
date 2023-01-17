import React from "react";
import PetForm from "../components/PetForm";
import Modal from "../components/Modal";
import { useState } from "react";

const AddPet = () => {
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        setShow(false);
    };

    return (
        <div className="add_pet">
            <h3>Add a new pet to the database: </h3>
            <button onClick={() => setShow(true)}>Add Pet</button>
            {show && (
                <Modal show={show} onClose={() => setShow(false)}>
                    <PetForm handleSubmit={handleSubmit} />
                </Modal>
            )}
        </div>
    );
};

export default AddPet;
