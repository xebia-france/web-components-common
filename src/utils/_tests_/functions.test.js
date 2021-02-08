import {
    hexToRgb,
    RGBtoString,
    RGBAtoString,
    getResponsiveKey,
    isNumber,
    removeSpaces,
    fileNameFromUrl,
    naiveCopy,
    getExtensionFileName,
    extractFileNameWithoutExtension, isOdd
} from "../functions";

describe('utils functions', () => {

    // hexToRgb

    it('function hexToRgb - should return undefined if value of hexadecimal is undefined', () => {
        const hexa = null;
        const expectedResult = undefined
        expect(hexToRgb(hexa)).toEqual(expectedResult);
    });

    it('function hexToRgb - should return rgb value of hexadecimal color', () => {
        const hexa = "#FFFFFF";
        const expectedResult = {r: 255, g: 255, b: 255}
        expect(hexToRgb(hexa)).toEqual(expectedResult);
    });

    it('function hexToRgb - should return null if hexa value passed on parameter is not valid', () => {
        const invalidHexa = "sss";
        const expectedResult = null
        expect(hexToRgb(invalidHexa)).toEqual(expectedResult);
    });

    // RGBtoString

    it('function RGBtoString - should return undefined if rgb parameter not defined', () => {
        const rgbObject = null
        expect(RGBtoString(rgbObject)).toEqual(undefined);
    });
    it('function RGBtoString - should return rgb string from rgb object', () => {
        const rgbObject = {r: 255, g: 255, b: 255};
        const expectedResult = 'rgb(255,255,255)';
        expect(RGBtoString(rgbObject)).toEqual(expectedResult);
    });

    // RGBAtoString

    it('function RGBAtoString - should return undefined if rgb parameter not defined', () => {
        const rgbObject = null;
        const opacity = 1;
        const expectedResult = 'rgba(255,255,255,1)';
        expect(RGBAtoString(rgbObject, opacity)).toEqual(undefined);
    });

    it('function RGBAtoString - should return rgba string from rgb object and opacity', () => {
        const rgbObject = {r: 255, g: 255, b: 255};
        const opacity = 1;
        const expectedResult = 'rgba(255,255,255,1)';
        expect(RGBAtoString(rgbObject, opacity)).toEqual(expectedResult);
    });

    // getResponsiveKey

    it('function getResponsiveKey - should return rgba string from rgb object and opacity', () => {
        const objectProperties = {
            M: {},
            T: {},
            D: {}
        }

        const expectedResult = ['M', 'T', 'D'];

        expect(getResponsiveKey(objectProperties)).toEqual(expectedResult);
    });

    // isNumber

    it('function isNumber - should return true if parameter is number', () => {
        expect(isNumber(1)).toBeTruthy();
    });

    it('function isNumber - should return true if parameter is number even if the type of parameter is string', () => {
        expect(isNumber('1')).toBeTruthy();
    });

    // removeSpaces

    it('function removeSpaces - should remove all spaces from a string', () => {
        const initialString = 'Lorem ipsum dolor sit amet.';
        const expectedResult = 'Loremipsumdolorsitamet.';

        expect(removeSpaces(initialString)).toEqual(expectedResult);
    });

    // fileNameFromUrl

    it('function removeSpaces - should extract fileName from file url', () => {
        const url = '//images.ctfassets.net/9/T-home-D.jpg';
        const expectedResult = 'T-home-D.jpg';

        expect(fileNameFromUrl(url)).toEqual(expectedResult);
    });

    // getExtensionFileName

    it('function getExtensionFileName - should extract extension of fileName ', () => {
        const fileName = 'T-home-D.jpg';
        const expectedResult = 'jpg';

        expect(getExtensionFileName(fileName)).toEqual(expectedResult);
    });

    // extractFileNameWithoutExtension

    it('function extractFileNameWithoutExtension - should extract fileName without file extension', () => {
        const fileName = 'T-home-D.jpg';
        const expectedResult = 'T-home-D';

        expect(extractFileNameWithoutExtension(fileName)).toEqual(expectedResult);
    });

    // naiveCopy

    it('function naiveCopy - should return copy of object', () => {
        const object = {
            M: {
                id : 1
            },
            T: {
                id : 2
            },
            D: {
                id : 3
            }
        };
        const expectedResult = {
            M: {
                id : 1
            },
            T: {
                id : 2
            },
            D: {
                id : 3
            }
        };

        expect(naiveCopy(object)).toEqual(expectedResult);
    });
    // isOdd

    it('function isOdd - should return true if number is odd', () => {
        expect(isOdd(2)).toBeTruthy;
    });


    it('function isOdd - should return false if number is not odd', () => {
        expect(isOdd(3)).toBeFalsy;
    });

});