import { useState } from "react";

function HEXInput({currentHEX, updateHEXvalue}) {
    const [hexInputValue, setHexInputValue] = useState("");

    const updateHexInputValue = (event) => {
        const newValue = event.target.value;
        setHexInputValue(newValue);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateHEXvalue(hexInputValue.toUpperCase(), true);
    }

    // JSX Returned
    return(
        <form className='colourSliders' onSubmit={handleSubmit}>
            <input
                id="hexInput"
                name="hexInput"
                className="hexLabelAndButton"
                type="text"
                placeholder={currentHEX}
                value={hexInputValue}
                onChange={updateHexInputValue}
                pattern="#([0-9a-f]{3}){1,2}"
            ></input>
            <button
                id="hexInputButton"
                name="hexInputButton"
                className="hexLabelAndButton hexEnterButton"
                type="submit"
            >Enter</button>
        </form>
    );
}

export default HEXInput;