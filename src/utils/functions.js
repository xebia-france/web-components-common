

const hexToRgb = hex => {
    if (!hex) return;
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const RGBtoString = rgb => {
    if (!rgb) return;
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
};

const RGBAtoString = (rgb, opacity) => {
    if (!rgb) return;
    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
};

const isResponsiveProps = props => {
    return (props.hasOwnProperty('M') || props.hasOwnProperty('T') || props.hasOwnProperty('D'));
};
const getResponsiveKey = props => {
    return Object.keys(props);
};

const isNumber = value => /^\d+$/.test(value);

const removeSpaces = string => string.replace(/ /g, "");

const fileNameFromUrl = ( url ) => {
    return url.substring(url.lastIndexOf('/') + 1)
}

function naiveCopy(mainObj) {
    let objCopy = {}; // objCopy will store a copy of the mainObj
    let key;

    for (key in mainObj) {
        objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
}


const getExtensionFileName = (fileName) => {
    return fileName.substr(fileName.lastIndexOf('.') + 1);
}

const extractWithoutExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.')
}


export {
    hexToRgb,
    RGBtoString,
    RGBAtoString,
    isResponsiveProps,
    getResponsiveKey,
    isNumber,
    removeSpaces, fileNameFromUrl, naiveCopy, getExtensionFileName, extractWithoutExtension
};
