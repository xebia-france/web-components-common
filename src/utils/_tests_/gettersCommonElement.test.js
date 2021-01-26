import React from 'react'
import { getImages, generatePictureWebP} from "../gettersCommonElement";
import { settingsSingleImage} from "../../test/mock/fields-data/organism.model.config";
import { render, screen } from '@testing-library/react'

const mockField = {
    responsiveSettings : ['M', 'T', 'D'],
    content : {
        images : [
            {
                alt  : {
                    0 : "this is a text"
                },
                asset : {
                    A :  {
                        fileName: 'myimage.png',
                        id : '1',
                        url : '//path-image/myimage.png'
                    }
                }
            }
        ]
    },
    settings : settingsSingleImage
}
const mockFieldNoContent = {
    responsiveSettings : ['M', 'T', 'D'],
    content : {
        images : [
            {
                alt  : {
                    0 : "this is a text"
                },
                asset : {
                    A :  {}
                }
            }
        ]
    },
    settings : settingsSingleImage
}

const mockUrlImagePNG = '//path-image/myimage.png'
const mockUrlImageJPG = '//path-image/myimage.jpg'
const mockUrlImageJPEG = '//path-image/myimage.jpeg'
const mockUrlImageSVG = '//path-image/myimage.svg'
const mockAlt = 'this is alt';

// getImages

describe('function getImages', () => {
    it('should return null when field passed on parameter havent content images', () => {
        expect(getImages(mockFieldNoContent)).toEqual([null]);
    });

    it('should return Array ', () => {
        expect(Array.isArray(getImages(mockField))).toBe(true);
    });

    it('should return Array with styled-component ImageContainerCommon', () => {
        expect( getImages(mockField).length).toEqual(1);
        expect(getImages(mockField)[0].type.displayName).toBe('commonstyled__ImageContainerCommon');
    });

});

// generatePictureWebP

function TestPictureComponent() {
    return <div>{generatePictureWebP(mockUrlImageJPEG,mockAlt)}</div>
}

describe('function generatePictureWebP', () => {

    it('should return <img> if navigator does not support WEBP', () => {
        document.documentElement.classList.add('no-webp');
        expect( generatePictureWebP(mockUrlImageJPEG, mockAlt).type).toBe('img');
    });

    it('should return <picture> if navigator support WEBP', () => {
        document.documentElement.classList.remove('no-webp');
        expect( generatePictureWebP(mockUrlImageJPEG, mockAlt).type).toBe('picture');
    });

    it('should return <picture> if extension of image is JPEG, JPG or PNG', () => {
        document.documentElement.classList.remove('no-webp');
        expect( generatePictureWebP(mockUrlImageJPEG, mockAlt).type).toBe('picture');
        expect( generatePictureWebP(mockUrlImageJPG, mockAlt).type).toBe('picture');
        expect( generatePictureWebP(mockUrlImagePNG, mockAlt).type).toBe('picture');
    });

    it('should return <img> if extension of image is not JPEG, JPG or PNG', () => {
        document.documentElement.classList.remove('no-webp');
        expect( generatePictureWebP(mockUrlImageSVG, mockAlt).type).toBe('img');
    });

    it('should return image with src corresponding to first parameter of function', () => {
        render(<TestPictureComponent/>);
        expect(screen.getByAltText(mockAlt).tagName).toMatch(/^img$/i);
        expect(screen.getByAltText(mockAlt).hasAttribute('src')).toBeTruthy()
        expect(screen.getByAltText(mockAlt).getAttribute('src')).toEqual(mockUrlImageJPEG)
    });

    it('should return image with alt corresponding to second parameter of function', () => {
        render(<TestPictureComponent/>);
        expect(screen.getByAltText(mockAlt).tagName).toMatch(/^img$/i);
        expect(screen.getByAltText(mockAlt).hasAttribute('alt')).toBeTruthy()
        expect(screen.getByAltText(mockAlt).getAttribute('alt')).toEqual(mockAlt)
    });
});



