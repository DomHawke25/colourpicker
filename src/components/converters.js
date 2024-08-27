function convertRGBtoHEX(RGBcode) {
    const convertNumtoHEX = (num) => {
        const HEX = num.toString(16).toUpperCase();
        return HEX.length === 1 ? "0" + HEX : HEX;
    }

    return `#${convertNumtoHEX(RGBcode.red)}${convertNumtoHEX(RGBcode.green)}${convertNumtoHEX(RGBcode.blue)}`;
}

function convertHEXtoRGB(HEXcode) {}

function convertRGBtoHSL(RGBcode) {
    let {red, green, blue} = RGBcode;
    // Set r, g, b to fractions of 1
    red /= 255;
    green /= 255;
    blue /= 255;

    // Set min, max and delta channel value
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    const diff = max - min;

    // Set saturation and lightness values
    let lightness = (max + min) / 2;
    let saturation = diff === 0 ? 0 : (diff / (1 - Math.abs(2 * lightness - 1)));
    lightness = (lightness * 100).toFixed(0);
    saturation = (saturation * 100).toFixed(0);

    // Calculate Hue
    let hue = 0;

    if (diff === 0) { // If Min and Max are the same
        hue = 0;
    } else if (max === red) {
        hue = ((green - blue) / diff) % 6;
    } else if (max === green) {
        hue = (blue - red) / diff + 2;
    } else if (max === blue) {
        hue = (red - green) / diff + 4;
    }
    
    hue = Math.round(hue * 60);

    if (hue < 0) {
        hue += 360;
    }

    // Return HSL
    return {hue, saturation, lightness};
}

function convertHSLtoRGB(HSLcode) {}

export {convertRGBtoHEX, convertHEXtoRGB, convertRGBtoHSL, convertHSLtoRGB};