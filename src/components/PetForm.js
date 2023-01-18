import "../AppCSS.css";
import { useState } from "react";
import axios from "axios";

const PetForm = ({ handleSubmit, petData }) => {
    const [petInfo, setPetInfo] = useState(
        petData
            ? { ...petData, picture: "" }
            : {
                  name: "",
                  type: "",
                  breed: "",
                  adoptionStatus: "",
                  height: 0,
                  weight: 0,
                  color: "",
                  hypoallergenic: false,
                  dietary: "",
                  bio: "",
                  picture: "",
              }
    );

    const handleChange = (e) => {
        if (e.target.name === "picture") {
            setPetInfo({
                ...petInfo,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setPetInfo((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const formData = new FormData();
            for (let key in petInfo) {
                formData.append(key, petInfo[key]);
            }

            if (petData) {
                if (petInfo.picture) {
                    await axios.put(
                        `${process.env.REACT_APP_SERVER_URL}/pets/updatePet/${petData.petId}`,
                        formData
                    );
                } else {
                    await axios.put(
                        `${process.env.REACT_APP_SERVER_URL}/pets/updatePetNoPic/${petData.petId}`,
                        petInfo
                    );
                }
            } else {
                if (petInfo.picture) {
                    await axios.post(
                        `${process.env.REACT_APP_SERVER_URL}/pets/addPet`,
                        formData
                    );
                } else {
                    await axios.post(
                        `${process.env.REACT_APP_SERVER_URL}/pets/addPetNoPic`,
                        petInfo
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
        handleSubmit();
    };

    return (
        <div className="form_container">
            <form
                className="pet_form"
            >
                <h1>Pet Details</h1>
                <div className="form_group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={petInfo.name}
                        required
                    />

                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        id="type"
                        onChange={handleChange}
                        value={petInfo.type}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                    </select>

                    <label htmlFor="breed">Breed</label>
                    <input
                        type="text"
                        name="breed"
                        id="breed"
                        onChange={handleChange}
                        value={petInfo.breed}
                    />

                    <label htmlFor="adoptionStatus">Adoption Status</label>
                    <select
                        name="adoptionStatus"
                        id="adoptionStatus"
                        onChange={handleChange}
                        value={petInfo.adoptionStatus}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="Available">Available</option>
                        <option value="Fostered">Fostered</option>
                        <option value="Adopted">Adopted</option>
                    </select>

                    <label htmlFor="height">Height (in cm)</label>
                    <input
                        type="number"
                        name="height"
                        id="height"
                        onChange={handleChange}
                        value={petInfo.height}
                    />

                    <label htmlFor="weight">Weight (in kg)</label>
                    <input
                        type="number"
                        name="weight"
                        id="weight"
                        onChange={handleChange}
                        value={petInfo.weight}
                    />

                    <label htmlFor="color">Color</label>
                    <input
                        type="text"
                        name="color"
                        id="color"
                        onChange={handleChange}
                        value={petInfo.color}
                    />

                    <label htmlFor="hypoallergenic">Hypoallergenic</label>
                    <input
                        type="checkbox"
                        name="hypoallergenic"
                        id="hypoallergenic"
                        onChange={handleChange}
                        value={petInfo.hypoallergenic}
                    />

                    <label htmlFor="dietary">Dietary Restrictions</label>
                    <input
                        type="text"
                        name="dietary"
                        id="dietary"
                        onChange={handleChange}
                        value={petInfo.dietary}
                    />

                    <label htmlFor="bio">Bio</label>
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        onChange={handleChange}
                        value={petInfo.bio}
                    />
                    <label htmlFor="picture">Picture: </label>
                    <input
                        type="file"
                        accept="img/*"
                        name="picture"
                        id="picture"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" value="submit" onClick={submit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PetForm;
