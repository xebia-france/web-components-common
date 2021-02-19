import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import ImageClickable from '../ImageClickable';
import {settingsCTA, settingsSingleImage} from "../../test/mock/fields-data/organism.model.config";
import {alignmentCenter, margin, padding, shadow, size, white , opacityBHD} from "../../test/mock/fields-data/atom.model.config";
import {borderBHD, iconMTD, typographyParagraphCTA} from "../../test/mock/fields-data/molecules.model.config";

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

const mockLink = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        link: {
            0: "http://test"
        }
    },
    settings: settingsCTA.defaultValue
}
const mockLinkSettingsStateTrue = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {
            0: "this is a label of link"
        },
        link: {
            0: "http://test"
        },
        icon: {
            0: "a"
        }

    },
    settings: {
        state: {
            external: true,
            disabled: true,
            animation : ''
        },
        basis: {
            M: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            },
            T: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            },
            D: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            }
        },
        typography: typographyParagraphCTA,
        icon: iconMTD,
        border: borderBHD
    }
}

const mockLanguage = 0;
const mockAssetsDirectory = '/assets/';
const mockClassName = 'test';


describe('functional -  ImageClickable', () => {

    it('should return null if field has no file value', () => {
        const {container} = render(<ImageClickable field={mockFieldNoFile} language={mockLanguage}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should render div container if field has file value', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.firstChild).toBeDefined;
    });

    it('should render div container with image as child if field has file value', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.firstChild.classList.contains(mockClassName)).toBeTruthy;
    });

    it('should render div container with class according to className passed on props', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img')).toBeTruthy;
    });

    it('should render div container with image as child which has alt attribute according to field content value ', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img').getAttribute('alt')).toEqual(mockField.content.images[0].alt[mockLanguage]);
    });

    it('should render div container with image as child which has alt empty attribute if field has not alt value according to language', () => {
        const {container} = render(<ImageClickable field={mockField} language={1} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img').getAttribute('alt')).toEqual('');
    });

    it('should render div container with image as child which has src attribute according to filename value  and assetsDirectory passed on props ', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img').getAttribute('src')).toEqual(`${mockAssetsDirectory}${mockField.content.images[0].asset.A.fileName}`);
    });

    it('should render div container with image as child which has src attribute according to filename value  and assetsDirectory passed on props ', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName}/>);
        expect(container.querySelector('img').getAttribute('src')).toEqual(`${mockAssetsDirectory}${mockField.content.images[0].asset.A.fileName}`);
    });

    it('should render div container with image clickable when Link property is defined', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        expect(container.querySelector('a')).toBeTruthy;
    });

    it('should render div container with image clickable with link according to field property  when Link property is defined', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        expect(container.querySelector('a').getAttribute('href')).toEqual(`${mockLink.content.link[mockLanguage]}`);
    });

    it('should render div container with image clickable with link according to field property  when Link property is defined', () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        expect(container.querySelector('a').getAttribute('href')).toEqual(`${mockLink.content.link[mockLanguage]}`);
    });
    it('should render div container with div with image not clickable with empty link  when Link property is defined and language does not match  with content', () => {
        const {container} = render(<ImageClickable field={mockField} language={1} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        expect(container.querySelector('div')).toBeTruthy;
    });

    it('should render div container with div with image not clickable with empty link  when Link property is defined and language does not match  with content', () => {
        const {container} = render(<ImageClickable field={mockField} language={1} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        expect(container.querySelector('div').getAttribute('href')).toEqual('');
    });

    it(`should render HTMLElement <a> with attribute target empty when settings state external is false `, () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        expect(container.firstChild.getAttribute("target")).toBeDefined;
        expect(container.firstChild.getAttribute("target")).toEqual('');
    });

    it(`should render HTMLElement <a> with attribute target blank when settings state external is true`, () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLinkSettingsStateTrue}/>);
        expect(container.firstChild.getAttribute("target")).toBeDefined;
        expect(container.firstChild.getAttribute("target")).toEqual('_blank');
    });

    it(`should render HTMLElement <a> with attribute rel empty when settings state external is false `, () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        expect(container.firstChild.getAttribute("rel")).toBeDefined;
        expect(container.firstChild.getAttribute("rel")).toEqual('');
    });

    it(`should render HTMLElement <a> with attribute rel noopener when settings state external is true`, () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLinkSettingsStateTrue}/>);
        expect(container.firstChild.getAttribute("rel")).toBeDefined;
        expect(container.firstChild.getAttribute("rel")).toEqual('noopener');
    });

    it(`should render HTMLElement <a> with classList which contains class 'disabled' when settings state disabled is true`, () => {
        const {container} = render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLinkSettingsStateTrue}/>);
        expect(container.firstChild.classList.contains(mockClassName)).toBeTruthy;
    });

    /*start test e.preventdefault

    Under the hook, fireEvent is calling dispatchEvent,
    so we can take advantage of the fact that calling event.preventDefault returns false if the event is cancelled

    */

    it(`should use preventdefault on click on CTA when settings state disabled is true`, () => {
        render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLinkSettingsStateTrue}/>);
        const cta = screen.getByTestId('cta');
        const isPrevented = fireEvent.click(cta);
        expect(isPrevented).toBe(false);
    });

    it(`should not use preventdefault on click on CTA when settings state disabled is false`, () => {
        render(<ImageClickable field={mockField} language={mockLanguage} assetsDirectory={mockAssetsDirectory} className={mockClassName} Link={mockLink}/>);
        const cta = screen.getByTestId('cta');
        const isPrevented = fireEvent.click(cta);
        expect(isPrevented).toBe(true);
    });
});