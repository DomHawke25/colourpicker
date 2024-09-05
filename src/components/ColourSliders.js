import RGBSliders from './RGBSliders';
import HSLSliders from './HSLSliders';
import '../styles/colourSliders.css';

function ColourSliders({activeColourType, currentRGB, currentHSL, updateRGBvalue, updateHSLvalue, updateHEXvalue}) {
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
            <form className='colourSliders'>
                <input type="text"></input>
            </form>
        )
    }
}

export default ColourSliders;