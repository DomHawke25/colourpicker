import RGBSliders from './RGBSliders';
import HSLSliders from './HSLSliders';
import HEXInput from './HEXInput';
import '../styles/colourSliders.css';

function ColourSliders({activeColourType, currentRGB, currentHSL, currentHEX, updateRGBvalue, updateHSLvalue, updateHEXvalue}) {
    if (activeColourType === "RGB") {
        return (
            <RGBSliders
                currentRGB={currentRGB}
                updateRGBvalue={updateRGBvalue}
            />
        )
    }
    if (activeColourType === "HSL") {
        return (
            <HSLSliders
                currentHSL={currentHSL}
                updateHSLvalue={updateHSLvalue}
            />
        )
    }
    if (activeColourType === "HEX") {
        return (
            <HEXInput
                currentHEX={currentHEX}
                updateHEXvalue={updateHEXvalue}
            />
        )
    }
}

export default ColourSliders;