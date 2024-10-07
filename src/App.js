import { useState } from "react";
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
  // Initialization of useStates needed for app
  const [colourList, setColourList] = useState([randomColour()]);
  const [activeTile, setActiveTile] = useState(0);
  const [activeColourType, setActiveColourType] = useState("RGB");
  const [currentHEX, setCurrentHEX] = useState(convertRGBtoHEX(colourList[activeTile]));
  const [currentHSL, setCurrentHSL] = useState(convertRGBtoHSL(colourList[activeTile]));

  const addColourTile = () => {
    if (colourList.length < 4) {
      // As long as there are less than 4 tiles, add new tile initialized with random colour.
      setColourList([...colourList, randomColour()]);
    }
  }

  const deleteColourTile = (tileId) => {
    if (colourList.length > 1) {
      setColourList(colourList.filter((colourTile, index) => index !== tileId));
      
      const updateHSLandHEXonDelete = (newActiveTile, colourToUse) => {
        setActiveTile(newActiveTile);
        updateHSLvalue(convertRGBtoHSL(colourList[colourToUse]), false);
        updateHEXvalue(convertRGBtoHEX(colourList[colourToUse]), false);
      }
      
      // Update active tile if neccessary, please note HSL and HEX values are updated with what will be the...
      // active tile as the activeTile useState has not updated yet.
      if (tileId === activeTile) {
        if (tileId === colourList.length - 1) {updateHSLandHEXonDelete(activeTile - 1, activeTile - 1)}
        if (tileId === 0) {updateHSLandHEXonDelete(0, activeTile + 1)}
        if (tileId !== 0 && tileId !== colourList.length - 1) {updateHSLandHEXonDelete(activeTile, activeTile + 1)}
      } else if (tileId < activeTile) {updateHSLandHEXonDelete(activeTile - 1, activeTile)}
    }
  }

  const setTileToActive = (selectedTileId) => {
    setActiveTile(selectedTileId);
    setCurrentHEX(convertRGBtoHEX(colourList[selectedTileId]));
    setCurrentHSL(convertRGBtoHSL(colourList[selectedTileId]));
  }

  const setColourTypeToActive = (newColourType) => {
    const availableTypes = ['RGB', 'HSL', 'HEX'];
    if (availableTypes.includes(newColourType)) {
      setActiveColourType(newColourType);
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

      if (updateOtherValues) {
        updateRGBvalue(convertHEXtoRGB(newHEX), false);
        updateHSLvalue(convertRGBtoHSL(convertHEXtoRGB(newHEX)), false);
      }
    }
  }


  // JSX Returned
  return (
    <>
      <Header />
      <ColourTiles
        colourList={colourList}
        activeTile={activeTile}
        addColourTile={addColourTile}
        deleteColourTile={deleteColourTile}
        setTileToActive={setTileToActive}
      />
      <ColourTypeSelector
        currentRGB={colourList[activeTile]}
        currentHSL={currentHSL}
        currentHEX={currentHEX}
        activeColourType={activeColourType}
        setColourTypeToActive={setColourTypeToActive}
      />
      <ColourSliders
        activeColourType={activeColourType}
        currentRGB={colourList[activeTile]}
        currentHSL={currentHSL}
        currentHEX={currentHEX}
        updateRGBvalue={updateRGBvalue}
        updateHSLvalue={updateHSLvalue}
        updateHEXvalue={updateHEXvalue}
      />
    </>
  );
}

export default App;
