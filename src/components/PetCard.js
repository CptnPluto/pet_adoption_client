import "../AppCSS.css";
import NavButton from "./NavButton";

const PetCard = ({ pet }) => {

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
