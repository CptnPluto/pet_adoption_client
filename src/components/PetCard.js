import "../AppCSS.css";
import NavButton from "./NavButton";

const PetCard = ({ pet }) => {

    // If the pet.picture URL start with `https://cataas.com//cat`, edit it to start with `https://cataas.com/cat` instead
    if (pet.picture.startsWith("https://cataas.com//cat")) {
        pet.picture = pet.picture.replace("https://cataas.com//cat", "https://cataas.com/cat");
    }

    return (
        <div className="pet-card">
            <h3>{pet.name}</h3>
            <img src={pet.picture} alt="pet" />
            <div className="status">Status: {pet.adoptionStatus}</div>

            <NavButton navLink="/pets" params={pet.petId}>
                View Details
            </NavButton>
        </div>
    );
};

export default PetCard;
