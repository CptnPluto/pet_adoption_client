import NavButton from "../components/NavButton";
import AdvancedSearch from "../components/AdvancedSearch";
import PetCard from "../components/PetCard";
import useSearchContext from "../Hooks/useSearchContext";

const Search = () => {
    const { petsList, handleSearch, handleChange } = useSearchContext();

    return (
        <div className="searchPage">
            <div className="searchPage-content">
                <div className="search">
                    <select
                        name="type"
                        id="searchDropdown"
                        onChange={handleChange}
                    >
                        <option value="search" hidden>
                            Search our pets databse!
                        </option>
                        <option value="all">All</option>
                        <option value="dog">Dogs</option>
                        <option value="cat">Cats</option>
                        <option value="bird">Birds</option>
                        <option value="reptile">Reptiles</option>
                        <option value="small animal">Small Animals</option>
                    </select>
                    <button type="button" onClick={() => handleSearch()}>
                        Search
                    </button>
                </div>
                <AdvancedSearch handleChange={handleChange} />
                <div className="card-container">
                    {petsList &&
                        petsList.map((pet) => (
                            <PetCard key={pet.petId} pet={pet} />
                        ))}
                    {petsList.length < 1 && (
                        <div className="message">Sorry, no results found. Please try again.</div>
                    )}
                </div>

                <NavButton navLink="/">Back to Homepage</NavButton>
            </div>
        </div>
    );
};

export default Search;
