import { useState, useEffect } from "react";
import Header from "./components/Header";
import ColourTiles from './components/ColourTiles';
import ColourTypeSelector from "./components/ColourTypeSelector";
import ColourSliders from "./components/ColourSliders";
import { convertRGBtoHEX, convertHEXtoRGB, convertRGBtoHSL, convertHSLtoRGB } from "./components/converters";
import './App.css';

// Generates random colour for intialization of each colour tile
const randomColour = () => {
  let red, green, blue;
  red = Math.floor(Math.random() * 256);
  green = Math.floor(Math.random() * 256);
  blue = Math.floor(Math.random() * 256);
  return {red, green, blue};
}

function App() {
  const [colourList, setColourList] = useState([randomColour()]);
  const [activeTile, setActiveTile] = useState(0);
  const [activeColourType, setActiveColourType] = useState("RGB");
  const [currentHEX, setCurrentHEX] = useState(convertRGBtoHEX(colourList[activeTile]));
  const [currentHSL, setCurrentHSL] = useState(convertRGBtoHSL(colourList[activeTile]));

  /*
  If the last tile is active when a tile is deleted, aka the activeTile number is greater than the total number of tiles,
  the following useEffect will set the activeTile to the new last tile.
  */

  useEffect(() => {
    if (activeTile > colourList.length - 1) {
      setActiveTile(colourList.length - 1);
    }

    setCurrentHEX(convertRGBtoHEX(colourList[activeTile]));
    setCurrentHSL(convertRGBtoHSL(colourList[activeTile]));
  }, [colourList, activeTile]);

  /*
    The following functions are for the colourTiles and associated useState's.

    addColourTile --> adds a new tile to the useState array, initializing the new tile with a random colour.
    
    deleteColourTile --> removes the selected tile from the useState array by filtering out the selected tile.
    the if statement keeps the currently selected tile selected when deleting tiles.
    
    setTileToActive --> Sets the useState to the tile selected.
    the if statement checkes that the ID passed is for a tile, and not the delete button,
    as using 'pointer-events: none' in the css code, means this onClick event is also run when deleting a tile.
  */

  const addColourTile = () => {
    if (colourList.length < 4) {
      setColourList([...colourList, randomColour()]);
    }
  }

  const deleteColourTile = (event) => {
    if (colourList.length > 1) {
      const tileId = parseInt(event.target.id.slice(-1));
      setColourList(colourList.filter((colourTile, index) => index !== tileId));
 
      if (tileId <= activeTile && activeTile !== 0) {
        setActiveTile(activeTile - 1);
      }
    }
  }

  const setTileToActive = (event) => {
    if (event.target.id.includes("Tile")) {
      const selectedTileId = parseInt(event.target.id.slice(-1));
      setActiveTile(selectedTileId);
    }
  }

  /*
  */

  const setColourTypeToActive = (event) => {
    const availableTypes = ['RGB', 'HSL', 'HEX'];
    if (availableTypes.includes(event.target.id)) {
      setActiveColourType(event.target.id);
    }
  }

  // JSX HTML Returned
  return (
    <>
      <Header />
      <ColourTiles
        colourList={colourList}
        addColourTile={addColourTile}
        deleteColourTile={deleteColourTile}
        activeTile={activeTile}
        setTileToActive={setTileToActive}
      />
      <ColourTypeSelector
        colourList={colourList}
        activeTile={activeTile}
        activeColourType={activeColourType}
        setColourTypeToActive={setColourTypeToActive}
        currentHEX={currentHEX}
        currentHSL={currentHSL}
      />
      <ColourSliders
        colourList={colourList}
        activeTile={activeTile}
      />
    </>
  );
}

export default App;
