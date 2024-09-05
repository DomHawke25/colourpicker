import Slider from "./Slider";

function HSLSliders ({currentHSL, updateHSLvalue}) {
    const {hue, saturation, lightness} = currentHSL;

    const updateHSLonChange = (event) => {
        const selectorID = event.target.id;
        const selectorValue = parseInt(event.target.value);
        let {hue: newHue, saturation: newSaturation, lightness: newLightness} = currentHSL;

        if (selectorID.includes('hue')) {
            newHue = selectorValue;
            updateHSLvalue({hue: newHue, saturation: newSaturation, lightness: newLightness}, true);
        }

        if (selectorID.includes('saturation')) {
            newSaturation = selectorValue;
            updateHSLvalue({hue: newHue, saturation: newSaturation, lightness: newLightness}, true);
        }

        if (selectorID.includes('lightness')) {
            newLightness = selectorValue;
            updateHSLvalue({hue: newHue, saturation: newSaturation, lightness: newLightness}, true);
        }
    }

    return (
        <form className="colourSliders">
            <Slider
                name="hue"
                range="360"
                letter="H"
                value={hue}
                updateOnChange={updateHSLonChange}
            />
            <Slider
                name="saturation"
                range="100"
                letter="S"
                value={saturation}
                updateOnChange={updateHSLonChange}
            />
            <Slider
                name="lightness"
                range="100"
                letter="L"
                value={lightness}
                updateOnChange={updateHSLonChange}
            />
        </form>
    )
}

export default HSLSliders;