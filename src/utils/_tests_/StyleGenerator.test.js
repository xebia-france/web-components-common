import {
    generatePadding,
    generateMargin,
    generateSize,
    generateFontProperties,
    generateBorder,
    getFormatedColor,
    getFormatedSizeProperty,
    toCamel,
    generateBackgroundImage,
    generateBackgroundImageWebp,
    generateBackgroundImageNoResponsive,
    generateBackgroundImageWebpNoResponsive
} from "../StyleGenerator";
import {black, opacity, transparent} from "../../test/mock/fields-data/atom.model.config";

const mockTestPaddingData1 = {
    M: {
        padding: {
            top: '0',
            right: '0',
            bottom: '0',
            left: '0'
        }
    }
}
const mockTestPaddingData2 = {
    M: {
        padding: {
            top: '1',
            right: '1',
            bottom: '1',
            left: '1'
        }
    }
}

describe('StyleGenerator - generatePadding', () => {
    it('should return no css padding property when padding value passed on parameter is 0 ', () => {
        const expectedStyle = ``;
        expect(generatePadding(mockTestPaddingData1, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return css padding property with padding value passed on parameter', () => {
        const expectedStyle = `padding-top:1px;padding-bottom:1px;padding-left:1px;padding-right:1px;`;
        expect(generatePadding(mockTestPaddingData2, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });
});


const mockTestMarginData1 = {
    M: {
        margin: {
            top: '0',
            right: '0',
            bottom: '0',
            left: '0'
        }
    }
}
const mockTestMarginData2 = {
    M: {
        margin: {
            top: '1',
            right: '1',
            bottom: '1',
            left: '1'
        }
    }
}

describe('StyleGenerator - generateMargin', () => {

    it('should return no css margin property when margin value passed on parameter is 0 ', () => {
        const expectedStyle = ``;
        expect(generateMargin(mockTestMarginData1, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return css margin property with margin value passed on parameter', () => {
        const expectedStyle = `margin-top:1px;margin-bottom:1px;margin-left:1px;margin-right:1px;`;
        expect(generateMargin(mockTestMarginData2, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });
});

const mockTestSizeData1 = {
    M: {
        size: {
            width: '',
            height: '',
            maxWidth: '',
            maxHeight: '',
            minWidth: '',
            minHeight: ''
        }
    }
}
const mockTestSizeData2 = {
    M: {
        size: {
            width: '1',
            height: '1',
            maxWidth: '1',
            maxHeight: '1',
            minWidth: '1',
            minHeight: '1'
        }
    }
}
const mockTestSizeData3 = {
    M: {
        size: {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            minWidth: '100%',
            minHeight: '100%'
        }
    }
}

describe('StyleGenerator - generateSize', () => {

    it('should return no css size property when value passed is empty string ', () => {
        const expectedStyle = ``;
        expect(generateSize(mockTestSizeData1, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return css size pixel property when value passed is number ', () => {
        const expectedStyle = `width:1px;height:1px;max-width:1px;max-height:1px;min-width:1px;min-height:1px;`;
        expect(generateSize(mockTestSizeData2, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return css size property with value passed is string ', () => {
        const expectedStyle = `width:100%;height:100%;max-width:100%;max-height:100%;min-width:100%;min-height:100%;`;
        expect(generateSize(mockTestSizeData3, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

});


const mockTestFontData1 = {
    M: {
        font: {
            theme: 'Title4',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: null
        },
        text: {
            align: null,
            transform: null,
            decoration: null
        }
    }
}
const mockTestFontData2 = {
    M: {
        font: {
            theme: 'Title4',
            family: 'Font-Family',
            typeface: 'sans-serif',
            weight: ['Regular', '400'],
            style: 'italic',
            size: '16',
            lineHeight: '18',
            letterSpacing: '0'
        },
        text: {
            align: 'left',
            transform: 'uppercase',
            decoration: 'underline'
        }
    }
}

describe('StyleGenerator - generateFontProperties', () => {

    it('should return no css size property when value passed is null', () => {
        const expectedStyle = ``;
        expect(generateFontProperties(mockTestFontData1, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return css font and text properties corresponding to passed value from parameter', () => {
        const expectedStyle = `font-size:16px;font-family:'Font-Family',sans-serif;font-style:italic;font-weight:400;line-height:18px;text-align:left;text-decoration:underline;text-transform:uppercase;`;
        expect(generateFontProperties(mockTestFontData2, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

});


const mockTestBorderData1 = {
    M: {
        width: {
            top: null,
            right: null,
            bottom: null,
            left: null
        },
        radius: {
            topLeft: null,
            topRight: null,
            bottomLeft: null,
            bottomRight: null
        }
    }
}
const mockTestBorderData2 = {
    M: {
        width: {
            top: '0',
            right: '0',
            bottom: '0',
            left: '0'
        },
        radius: {
            topLeft: '0',
            topRight: '0',
            bottomLeft: '0',
            bottomRight: '0'
        }
    }
}
const mockTestBorderData3 = {
    M: {
        width: {
            top: '1',
            right: '1',
            bottom: '1',
            left: '1'
        },
        radius: {
            topLeft: '1',
            topRight: '1',
            bottomLeft: '1',
            bottomRight: '1'
        }
    }
}
const mockTestBorderData4 = {
    M: {
        width: {
            top: '10%',
            right: '10%',
            bottom: '10%',
            left: '10%'
        },
        radius: {
            topLeft: '10%',
            topRight: '10%',
            bottomLeft: '10%',
            bottomRight: '10%'
        }
    }
}

describe('StyleGenerator - generateBorder', () => {

    it('should return no css size and radius property when value passed is null, only return border-style property by default', () => {
        const expectedStyle = `border-style:solid;`;
        expect(generateBorder(mockTestBorderData1, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return no css size and radius property when value passed is 0, only return border-style property by default', () => {
        const expectedStyle = `border-style:solid;`;
        expect(generateBorder(mockTestBorderData2, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return css size and radius properties corresponding to passed value from parameter and property should be in pixel when value passed is number  ', () => {
        const expectedStyle = `border-style:solid;border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px;border-top-left-radius:1px;border-top-right-radius:1px;border-bottom-right-radius:1px;border-bottom-left-radius:1px;`;
        expect(generateBorder(mockTestBorderData3, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

    it('should return css size and radius properties corresponding to passed value from parameter when value passed is string  ', () => {
        const expectedStyle = `border-style:solid;border-top-width:10%;border-right-width:10%;border-bottom-width:10%;border-left-width:10%;border-top-left-radius:10%;border-top-right-radius:10%;border-bottom-right-radius:10%;border-bottom-left-radius:10%;`;
        expect(generateBorder(mockTestBorderData4, 'M').replace(/\s/g, '')).toEqual(expectedStyle);
    });

});

describe('StyleGenerator - getFormatedColor', () => {

    it('should return transparent when color.hex is transparent', () => {
        const expectedValue = `transparent`;
        expect(getFormatedColor(transparent, opacity)).toEqual(expectedValue);
    });

    it('should return rgba string property when color.hex is not transparent', () => {
        const expectedValue = `rgba(0,0,0,1)`;
        expect(getFormatedColor(black, opacity)).toEqual(expectedValue);
    });

});

describe('StyleGenerator - getFormatedSizeProperty', () => {


    it('should return empty string when value of property passed on argument is null or undefined ', () => {
        const testData = {
            width: null,
        }
        expect(getFormatedSizeProperty('width', testData).replace(/\s/g, '')).toEqual('');
        expect(getFormatedSizeProperty('max-width', testData).replace(/\s/g, '')).toEqual('');
    });

    it('should return css property with pixel value when value of property passed on argument is string', () => {
        const testData = {
            width: '10%',
            maxWidth: '10%'
        }
        expect(getFormatedSizeProperty('width', testData).replace(/\s/g, '')).toEqual('width:10%;');
        expect(getFormatedSizeProperty('max-width', testData).replace(/\s/g, '')).toEqual('max-width:10%;');
    });

    it('should return css property with pixel value when value of property passed on argument is number', () => {
        const testData = {
            width: '1',
            maxWidth: '1'
        }
        expect(getFormatedSizeProperty('width', testData).replace(/\s/g, '')).toEqual('width:1px;');
        expect(getFormatedSizeProperty('max-width', testData).replace(/\s/g, '')).toEqual('max-width:1px;');
    });


});

describe('StyleGenerator - toCamel', () => {

    it('should return string corresponding to  Camel case rule', () => {
        const initialString = 'max-width_test'
        const expectedValue = `maxWidthTest`;
        expect(toCamel(initialString)).toEqual(expectedValue);
    });

});

const mockBackgroundData1 = {
    M: {
        fileName: null
    }
}
const mockBackgroundData2JPG = {
    M: {
        fileName: 'myimage.jpg'
    }
}
const mockBackgroundData2PNG = {
    M: {
        fileName: 'myimage.png'
    }
}
const mockBackgroundData2JPEG = {
    M: {
        fileName: 'myimage.jpeg'
    }
}
const mockBackgroundData2SVG = {
    M: {
        fileName: 'myimage.svg'
    }
}
const assetDirectory = '/assets/';
const mockUrlImagePNG = 'myimage.png'
const mockUrlImageJPG = 'myimage.jpg'
const mockUrlImageJPEG = 'myimage.jpeg'
const mockUrlImageSVG = 'myimage.svg'

describe('StyleGenerator - generateBackgroundImage', () => {

    it('should return empty string if fileName is does not exist', () => {
        const expectedValue = ``;
        expect(generateBackgroundImage(mockBackgroundData1, 'M', assetDirectory)).toEqual(expectedValue);
    });

    it('should return css  background-image property with path corresponding to asset directory and  filename passed on arguments', () => {
        const expectedValue = `background-image:url('/assets/myimage.jpg');background-size:cover;background-position:center;`;
        expect(generateBackgroundImage(mockBackgroundData2JPG, 'M', assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);
    });

});

describe('StyleGenerator - generateBackgroundImageNoResponsive', () => {

    it('should return empty string if fileName is does not exist', () => {
        const expectedValue = ``;
        expect(generateBackgroundImageNoResponsive(null, assetDirectory)).toEqual(expectedValue);
    });

    it('should return css  background-image property with path corresponding to asset directory and  filename passed on arguments', () => {
        const expectedValue = `background-image:url('/assets/myimage.jpg');background-size:cover;background-position:center;`;
        expect(generateBackgroundImageNoResponsive(mockUrlImageJPG, assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);
    });

});

describe('StyleGenerator - generateBackgroundImageWebp', () => {

    it('should return empty string if fileName is does not exist', () => {
        const expectedValue = ``;
        expect(generateBackgroundImageWebp(mockBackgroundData1, 'M', assetDirectory)).toEqual(expectedValue);
    });

    it('should return css background-image property with path corresponding to asset directory and  filename passed on arguments, formated for  WEBP if type of  image is PNG, JPEG or JPS', () => {
        const expectedValue = `background-image:url('/assets/myimage.webp');background-size:cover;background-position:center;`;

        expect(generateBackgroundImageWebp(mockBackgroundData2JPG, 'M', assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);

        expect(generateBackgroundImageWebp(mockBackgroundData2JPEG, 'M', assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);

        expect(generateBackgroundImageWebp(mockBackgroundData2PNG, 'M', assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);
    });

    it('should return css background-image property with path corresponding to asset directory and  filename passed on arguments', () => {
        const expectedValue = `background-image:url('/assets/myimage.svg');background-size:cover;background-position:center;`;
        expect(generateBackgroundImageWebp(mockBackgroundData2SVG, 'M', assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);
    });

});

describe('StyleGenerator - generateBackgroundImageWebpNoResponsive', () => {

    it('should return empty string if fileName is does not exist', () => {
        const expectedValue = ``;
        expect(generateBackgroundImageWebpNoResponsive(null, assetDirectory)).toEqual(expectedValue);
    });

    it('should return css background-image property with path corresponding to asset directory and  filename passed on arguments, formated for  WEBP if type of  image is PNG, JPEG or JPS', () => {
        const expectedValue = `background-image:url('/assets/myimage.webp');background-size:cover;background-position:center;`;

        expect(generateBackgroundImageWebpNoResponsive(mockUrlImageJPG, assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);

        expect(generateBackgroundImageWebpNoResponsive(mockUrlImageJPEG, assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);

        expect(generateBackgroundImageWebpNoResponsive(mockUrlImagePNG, assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);
    });

    it('should return css background-image property with path corresponding to asset directory and  filename passed on arguments', () => {
        const expectedValue = `background-image:url('/assets/myimage.svg');background-size:cover;background-position:center;`;
        expect(generateBackgroundImageWebpNoResponsive(mockUrlImageSVG, assetDirectory).replace(/\s/g, '')).toEqual(expectedValue);
    });

});