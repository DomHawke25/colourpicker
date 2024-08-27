import '../styles/colourSliders.css';

function ColourSliders({colourList, setColourList, activeTile, activeColourType, currentHSL}) {
    const {hue, saturation, lightness} = currentHSL;
    const {red, green, blue} = colourList[activeTile];

    const updateColourList = (updatedColour) => {
        const {red, green, blue} = updatedColour;
        if (red >= 0 && red <= 255 && green >= 0 && green <= 255 && blue >= 0 && blue <= 255) {
          setColourList(colourList.map((colour, index) => {
            if (index === activeTile) {
                return updatedColour;
            }
            return colour;
          }))
        }
    }
    
    const updateColourValueOnChange = (event) => {
        const selectorID = event.target.id;
        const selectorValue = parseInt(event.target.value);
        let {red, green, blue} = colourList[activeTile];

        if (selectorID.includes('red')) {
            red = selectorValue;
            updateColourList({red, green, blue});
        }

        if (selectorID.includes('green')) {
            green = selectorValue;
            updateColourList({red, green, blue});
        }

        if (selectorID.includes('blue')) {
            blue = selectorValue;
            updateColourList({red, green, blue});
        }
    }

    const slider = (name, range, letter, value) => {
        return (
            <div className='sliderContainer'>
                <label htmlFor={`${name}Slider`} className='label'>{letter}</label>
                <input
                    type="range"
                    id={`${name}Slider`}
                    name={`${name}Slider`}
                    max={range}
                    step='1'
                    value={value}
                    onChange={updateColourValueOnChange}
                ></input>
                <input
                    type="text"
                    id={`${name}Text`}
                    value={value}
                    className='textbox'
                    onChange={updateColourValueOnChange}
                ></input>
            </div>
        )
    }

    if (activeColourType === "RGB") {
        return (
            <form className="colourSliders">
                {slider("red", "255", "R", red)}
                {slider("green", "255", "G", green)}
                {slider("blue", "255", "B", blue)}
            </form>
        )
    }

    if (activeColourType === "HSL") {
        return (
            <form className='colourSliders'>
                {slider("hue", "360", "H", hue)}
                {slider("saturation", "100", "S", saturation)}
                {slider("lightness", "100", "L", lightness)}
            </form>
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