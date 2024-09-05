import { useState, useEffect } from "react";
import Header from "./components/Header";
import ColourTiles from './components/ColourTiles';
import ColourTypeSelector from "./components/ColourTypeSelector";
import ColourSliders from "./components/ColourSliders";
import { convertRGBtoHEX, convertRGBtoHSL, convertHSLtoRGB } from "./components/converters";
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
  // Initialization of useStates needed for app
  const [colourList, setColourList] = useState([randomColour()]);
  const [activeTile, setActiveTile] = useState(0);
  const [activeColourType, setActiveColourType] = useState("RGB");
  const [currentHEX, setCurrentHEX] = useState(convertRGBtoHEX(colourList[activeTile]));
  const [currentHSL, setCurrentHSL] = useState(convertRGBtoHSL(colourList[activeTile]));


  useEffect(() => {
    /* If the last tile is active when a tile is deleted, aka the activeTile number is greater than the total number of tiles,
    the following will set the activeTile to the new last tile. */
    if (activeTile > colourList.length - 1) {
      setActiveTile(colourList.length - 1);
    }
  }, [colourList, activeTile]);


  // Functions below are used for updating the useState's

  const addColourTile = () => {
    if (colourList.length < 4) {
      // As long as there are less than 4 tiles, add new tile initialized with random colour.
      setColourList([...colourList, randomColour()]);
    }
  }

  const deleteColourTile = (event) => {
    if (colourList.length > 1) {
      const tileId = parseInt(event.target.id.slice(-1));
      setColourList(colourList.filter((colourTile, index) => index !== tileId));
 
      if (tileId <= activeTile && activeTile !== 0) {
        // Keep the currently selected tile selected when deleting tiles
        setActiveTile(activeTile - 1);
      }
    }
  }

  const setTileToActive = (event) => {
    if (event.target.id.includes("Tile")) {
      /* If statement checkes that the ID passed is for a tile, and not the delete button,
      as using 'pointer-events: none' in the css code, means this onClick event is also run when deleting a tile. */
      const selectedTileId = parseInt(event.target.id.slice(-1));
      setActiveTile(selectedTileId);
      setCurrentHEX(convertRGBtoHEX(colourList[selectedTileId]));
      setCurrentHSL(convertRGBtoHSL(colourList[selectedTileId]));
    }
  }

  const setColourTypeToActive = (event) => {
    const availableTypes = ['RGB', 'HSL', 'HEX'];
    if (availableTypes.includes(event.target.id)) {
      setActiveColourType(event.target.id);
    }
  }

  const updateRGBvalue = (newRGB, updateOtherValues) => {
    const {red, green, blue} = newRGB;
    if (red >= 0 && red <= 255 && green >= 0 && green <= 255 && blue >= 0 && blue <= 255) {
      setColourList(colourList.map((colour, index) => {
        if (index === activeTile) {
            return newRGB;
        }
        return colour;
      }));
      
      if (updateOtherValues) {
        updateHSLvalue(convertRGBtoHSL(newRGB), false);
        updateHEXvalue(convertRGBtoHEX(newRGB), false);
      }
    }
  }

  const updateHSLvalue = (newHSL, updateOtherValues) => {
    const {hue, saturation, lightness} = newHSL;
    if (hue >= 0 && hue <= 360 && saturation >= 0 && saturation <= 100 && lightness >= 0 && lightness <= 100) {
      setCurrentHSL(newHSL);

      if (updateOtherValues) {
        updateRGBvalue(convertHSLtoRGB(newHSL), false);
        updateHEXvalue(convertRGBtoHEX(convertHSLtoRGB(newHSL)), false);
      }
    }
  }

  const updateHEXvalue = (newHEX, updateOtherValues) => {
    let reg = /^#([0-9a-f]{3}){1,2}$/i;
    if (reg.test(newHEX)) {
      setCurrentHEX(newHEX);

      if (updateOtherValues) {}
    }
  }


  // JSX Returned
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
        activeColourType={activeColourType}
        currentRGB={colourList[activeTile]}
        currentHSL={currentHSL}
        updateRGBvalue={updateRGBvalue}
        updateHSLvalue={updateHSLvalue}
        updateHEXvalue={updateHEXvalue}
      />
    </>
  );
}

export default App;
