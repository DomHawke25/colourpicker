function Slider({name, range, letter, value, updateOnChange}) {
    return (
        <div className='sliderContainer'>
            <label htmlFor={`${name}Slider`} className='label'>{letter}</label>
            <input
                type="range"
                id={`${name}Slider`}
                name={`${name}Slider`}
                max={range}
                value={value}
                onChange={updateOnChange}
            ></input>
            <input
                type="text"
                id={`${name}Text`}
                value={value}
                className='textbox'
                onChange={updateOnChange}
            ></input>
        </div>
    )
}

export default Slider;