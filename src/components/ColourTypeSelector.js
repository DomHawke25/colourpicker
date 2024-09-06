import '../styles/colourTypeSelector.css'
import copyIcon from '../images/icons8-copy-32.png';

function ColourTypeSelector({currentRGB, currentHSL, currentHEX, activeColourType, setColourTypeToActive}) {
    const rgbCode = `(${currentRGB.red} , ${currentRGB.green} , ${currentRGB.blue})`;
    const hslCode = `(${currentHSL.hue}, ${currentHSL.saturation}%, ${currentHSL.lightness}%)`;

    const onClick_setColourTypeToActive = (event) => {
        const newColourType = event.target.id;
        setColourTypeToActive(newColourType);
    }

    const copyToClipboard = (event) => {
        const type = event.target.id.slice(-3);
        const itemToBeCopied = document.getElementById(`colourCode${type}`);
        const textToBeCopied = type === 'RGB' || type === 'HSL' ? `${type.toLowerCase()}${itemToBeCopied.innerHTML}` : itemToBeCopied.innerHTML;
        navigator.clipboard.writeText(textToBeCopied);
    }

    const colourTypeDisplay = (type, colourCode) => {
        return (
            <div
                id={type}
                className={type === activeColourType ? 'colourType activeColourType' : 'colourType'}
                onClick={onClick_setColourTypeToActive}
            >
                <img id={`copy${type}`} src={copyIcon} alt='Copy icon by icons8.com' className='copyButton' onClick={copyToClipboard}/>
                <p className='colourTypeHeader noPointerEvent'>{type}</p>
                <p id={`colourCode${type}`} className='colourCode noPointerEvent'>{colourCode}</p>
            </div>
        );
    }

    // JSX Returned
    return (
        <section className='colourTypeSelector'>
            {colourTypeDisplay("RGB", rgbCode)}
            {colourTypeDisplay("HSL", hslCode)}
            {colourTypeDisplay("HEX", currentHEX)}
        </section>
    );
}

export default ColourTypeSelector;