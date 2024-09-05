import '../styles/colourTiles.css';
import binIcon from '../images/icons8-bin-24.png';

function ColourTiles({colourList, addColourTile, deleteColourTile, activeTile, setTileToActive}) {
    // The following creates a delete button for the colour tiles if there is more than one tile.
    const deleteButton = (index) => {
        if (colourList.length > 1) {
            return (
                <button
                    type='button'
                    id={`Delete-${index}`}
                    className='binButton'
                    onClick={deleteColourTile}
                >
                    <img src={binIcon} alt='Bin icon by icons8.com' className='noPointerEvent'/>
                </button>
            );
        }
        return null;
    }

    // The following creates an add button tile if there are less than four tiles.
    const addTile = () => {
        if (colourList.length < 4) {
            return (
                <button
                    type="button"
                    className="tile addTile"
                    onClick={addColourTile}
                >+</button>
            );
        }
        return null;
    }

    // JSX Returned
    return (
        <section className='colourTiles'>
            {colourList.map((colour, index) => {
                const {red, green, blue} = colour;
                return (
                    <div
                        id={`Tile-${index}`}
                        key={index}
                        className={index === activeTile ? 'tile activeTile' : 'tile'}
                        style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}}
                        onClick={setTileToActive}
                    >
                        {deleteButton(index)}
                    </div>
                );
            })}
            {addTile()}
        </section>
    );
}

export default ColourTiles;