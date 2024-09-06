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
    let hue;
    if (diff === 0) { // If Min and Max are the same
        hue = 0;
    } else {
        if (max === red) {
            hue = ((green - blue) / diff) % 6;
        }
        if (max === green) {
            hue = (blue - red) / diff + 2;
        }
        if (max === blue) {
            hue = (red - green) / diff + 4;
        }
    }
    
    hue = Math.round(hue * 60);

    if (hue < 0) {
        hue += 360;
    }

    // Return HSL
    return {hue, saturation, lightness};
}

function convertHSLtoRGB(HSLcode) {
    let {hue, saturation, lightness} = HSLcode;
    let red, green, blue;

    hue /= 60;
    // Set saturation and lightness to fractions of 1
    saturation /= 100;
    lightness /= 100;

    // Initailize chroma and x values
    const chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
    const x = chroma * (1 - Math.abs((hue % 2) - 1));

    // Use the value of Hue to calculate which combination is required
    const hueSelector = Math.floor(hue);
    switch (hueSelector) {
        case 0:
            red = chroma;
            green = x;
            blue = 0;
            break;
        case 1:
            red = x;
            green = chroma;
            blue = 0;
            break;
        case 2:
            red = 0;
            green = chroma;
            blue = x;
            break;
        case 3:
            red = 0;
            green = x;
            blue = chroma;
            break;
        case 4:
            red = x;
            green = 0;
            blue = chroma;
            break;
        case 5:
            red = chroma;
            green = 0;
            blue = x;
            break;
        case 6:
            red = chroma;
            green = 0;
            blue = x;
            break;
        default:
            red = 0;
            green = 0;
            blue = 0;
            break;
    }

    // Adjust r, g, b to factor in lightness
    const lightnessAdjustment = lightness - (chroma / 2);
    red += lightnessAdjustment;
    green += lightnessAdjustment;
    blue += lightnessAdjustment;

    // Convert r, g, b from fractions of 1 into usuable values
    red = Math.round(red * 255);
    green = Math.round(green * 255);
    blue = Math.round(blue * 255);

    // Return RGB
    return {red, green, blue};
}

export {convertRGBtoHEX, convertHEXtoRGB, convertRGBtoHSL, convertHSLtoRGB};