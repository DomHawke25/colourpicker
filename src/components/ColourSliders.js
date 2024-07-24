import '../styles/colourSliders.css';

function ColourSliders({colourList, activeTile}) {
    const slider = (name, range, letter) => {
        return (
            <div>
                <label htmlFor={`${name}Slider`}>{letter}</label>
                <input type="range" id={`${name}Slider`} name={`${name}Slider`}></input>
                <input type="text"></input>
            </div>
        )
    }

    return (
        <form className="colourSliders">
            {slider("red", "255", "R")}
            {slider("green", "255", "G")}
            {slider("blue", "255", "B")}
        </form>
    )
}

export default ColourSliders;