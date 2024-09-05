import Slider from "./Slider";

function RGBSliders({currentRGB, updateRGBvalue}) {
    const {red, green, blue} = currentRGB;

    const updateRGBonChange = (event) => {
        const selectorID = event.target.id;
        const selectorValue = parseInt(event.target.value);
        let {red: newRed, green: newGreen, blue: newBlue} = currentRGB;

        if (selectorID.includes('red')) {
            newRed = selectorValue;
            updateRGBvalue({red: newRed, green: newGreen, blue: newBlue}, true);
        }

        if (selectorID.includes('green')) {
            newGreen = selectorValue;
            updateRGBvalue({red: newRed, green: newGreen, blue: newBlue}, true);
        }

        if (selectorID.includes('blue')) {
            newBlue = selectorValue;
            updateRGBvalue({red: newRed, green: newGreen, blue: newBlue}, true);
        }
    }

    return (
        <form className="colourSliders">
            <Slider
                name="red"
                range="255"
                letter="R"
                value={red}
                updateOnChange={updateRGBonChange}
            />
            <Slider
                name="green"
                range="255"
                letter="G"
                value={green}
                updateOnChange={updateRGBonChange}
            />
            <Slider
                name="blue"
                range="255"
                letter="B"
                value={blue}
                updateOnChange={updateRGBonChange}
            />
        </form>
    )
}

export default RGBSliders;