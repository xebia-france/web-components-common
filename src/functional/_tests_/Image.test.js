import React from 'react';
import {render} from '@testing-library/react'
import Image from '../Image';
import {settingsSingleImage} from "../../test/mock/fields-data/organism.model.config";

const mockField = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        images : [
            {
                alt : {
                    0 : 'this is the alt of image'
                },
                asset  :{
                    A : {
                        fileName : 'image.png',
                        id : 'ABC123',
                        url : '//images/image.png'
                    }
                }
            }
        ]
    },
    settings: settingsSingleImage.defaultValue
}
const mockFieldNoFile = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        images : [
            {
                alt : {
                    0 : 'this is the alt of image'
                },
                asset  :{
                    A : {}
                }
            }
        ]
    },
    settings: settingsSingleImage.defaultValue
}

const mockLanguage = 0;
const mockAssetsDirectory = '/assets/';
const mockClassName = 'test';

describe('functional -  Image', () => {

    it('should return null if field has no file value', () => {
        const {container} = render(<Image field={mockFieldNoFile} language={mockLanguage}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should render div container if field has file value', () => {
        const {container} = render(<Image field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.firstChild).toBeDefined;
    });

    it('should render div container with image as child if field has file value', () => {
        const {container} = render(<Image field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.firstChild.classList.contains(mockClassName)).toBeTruthy;
    });

    it('should render div container with class according to className passed on props', () => {
        const {container} = render(<Image field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img')).toBeTruthy;

    });

    it('should render div container with image as child which has alt attribute according to field content value ', () => {
        const {container} = render(<Image field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img').getAttribute('alt')).toEqual(mockField.content.images[0].alt[mockLanguage]);

    });

    it('should render div container with image as child which has alt empty attribute if field has not alt value according to language', () => {
        const {container} = render(<Image field={mockField} language={1} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img').getAttribute('alt')).toEqual('');

    });

    it('should render div container with image as child which has src attribute according to filename value  and assetsDirectory passed on props ', () => {
        const {container} = render(<Image field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img').getAttribute('src')).toEqual(`${mockAssetsDirectory}${mockField.content.images[0].asset.A.fileName}`);

    });
});