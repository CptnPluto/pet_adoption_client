import { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";

const AdvancedSearch = ({ handleChange }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [minHeight, setMinHeight] = useState(0);
    const [maxHeight, setMaxHeight] = useState(150);
    const [minWeight, setMinWeight] = useState(0);
    const [maxWeight, setMaxWeight] = useState(200);

    useEffect(() => {
        handleChange({
            height: [minHeight, maxHeight],
            weight: [minWeight, maxWeight],
        });
    }, [minHeight, maxHeight, minWeight, maxWeight, handleChange]);
    return (
        <>
            <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="advancedSearchButton"
            >
                Toggle Advanced Search
            </button>
            {showAdvanced && (
                <div className="search">
                    <form className="advancedSearch">
                        <div className="sliderContainer">
                            <h3>Height Range</h3>
                            <MultiRangeSlider
                                min={0}
                                max={150}
                                step={1}
                                minValue={minHeight}
                                maxValue={maxHeight}
                                ruler="false"
                                name="height"
                                onChange={(e) => {
                                    setMinHeight(e.minValue);
                                    setMaxHeight(e.maxValue);
                                }}

                                // }}
                            ></MultiRangeSlider>
                        </div>
                        <div className="sliderContainer">
                            <h3>Weight Range</h3>
                            <MultiRangeSlider
                                min={0}
                                max={200}
                                step={1}
                                minValue={minWeight}
                                maxValue={maxWeight}
                                ruler="false"
                                name="weight"
                                onInput={(e) => {
                                    setMinWeight(e.minValue);
                                    setMaxWeight(e.maxValue);
                                }}
                            ></MultiRangeSlider>
                        </div>
                        {/* <select
                            name="dietary"
                            id="dietary"
                            onChange={handleChange}
                        >
                            
                            <option value="" hidden>
                                Select any desired dietary restriction!
                            </option>
                            <option value="">None</option>
                            <option value="gluten-free">Gluten Free</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="carnivore">Carnivore</option>
                        </select> */}

                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            placeholder="Search by name"
                        />

                        <label htmlFor="adoptionStatus">Adoption Status</label>
                        <select
                            name="adoptionStatus"
                            id="adoptionStatus"
                            onChange={handleChange}
                        >
                            <option value="All">All</option>
                            <option value="Available">Adoptable</option>
                            <option value="Adopted">Adopted</option>
                            <option value="Fostered">Fostering</option>
                        </select>

                        {/* <label htmlFor="hypoallergenic">Hypoallergenic</label>
                        <select
                            name="hypoallergenic"
                            id="hypoallergenic"
                            onChange={handleChange}
                        >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select> */}
                    </form>
                </div>
            )}
        </>
    );
};

export default AdvancedSearch;
