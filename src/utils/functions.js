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
    console.log('rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')');
    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
};

const isResponsiveProps = props => {
    return (props.hasOwnProperty('M') || props.hasOwnProperty('T') || props.hasOwnProperty('D'));
};
const getResponsiveKey = props => {
    return Object.keys(props);
};

const isNumber = value => /^\d+$/.test(value);

export {
    hexToRgb,
    RGBtoString,
    RGBAtoString,
    isResponsiveProps,
    getResponsiveKey,
    isNumber
};
