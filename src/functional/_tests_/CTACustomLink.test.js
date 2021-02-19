import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import CTACustomLink from '../CTACustomLink';
import {settingsCTA} from "../../test/mock/fields-data/organism.model.config";
import {
    margin,
    padding,
    size,
    alignmentCenter,
    white,
    shadow,
    opacityBHD
} from "../../test/mock/fields-data/atom.model.config";
import {iconMTD, typographyParagraphCTA, borderBHD} from "../../test/mock/fields-data/molecules.model.config";

const mockField = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {
            0: "this is a label of link"
        },
        icon: {
            0: "a"
        }

    },
    settings: settingsCTA.defaultValue
}

const mockFieldNoContentText = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {},
        icon: {
            0: "a"
        }
    },
    settings: settingsCTA.defaultValue
}

const mockFieldNoIcon = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {
            0: "this is a label of link"
        },
        icon: {}
    },
    settings: settingsCTA.defaultValue
}

const mockFieldNoContentTextNoIcon = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {},
        icon: {}
    },
    settings: settingsCTA.defaultValue
}

const mockFieldSettingsStateTrue = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {
            0: "this is a label of link"
        },
        icon: {
            0: "a"
        }

    },
    settings: {
        state: {
            external: true,
            disabled: true,
            animation: ''
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

const mockLink = 'https://test';

describe('functional -  CTACustomLink', () => {

    it('should return null if field has no text value and no icon value', () => {
        const {container} = render(<CTACustomLink field={mockFieldNoContentTextNoIcon} language={mockLanguage}
                                                  link={mockLink}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should return null if field has not text value and no icon value according to language', () => {
        const {container} = render(<CTACustomLink field={mockField} language={1} link={mockLink}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should render label of link  depending on language', () => {
        render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        const element = screen.getByText('this is a label of link')
        expect(element).toBeTruthy();
    });

    it(`should render HTMLElement <p> with text value depending on language`, () => {
        const {container} = render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        expect(screen.getByText('this is a label of link')).toBeInTheDocument;
        expect(container.querySelector('p')).toBeDefined;
    });

    it(`should not render HTMLElement <p> if field has not text value according to language`, () => {
        const {container} = render(<CTACustomLink field={mockFieldNoContentText} language={mockLanguage}
                                                  link={mockLink}/>);
        expect(container.querySelector('p')).toBeUndefined;
    });

    it(`should render HTMLElement <i> with icon value depending on language`, () => {
        render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        expect(screen.getByTestId('cta-icon')).toBeDefined;
        expect(screen.getByTestId('cta-icon').textContent).toBe('a');
    });

    it(`should not render HTMLElement <i> if field has not icon value according to language`, () => {
        const {container} = render(<CTACustomLink field={mockFieldNoIcon} language={mockLanguage} link={mockLink}/>);
        expect(container.querySelector('i')).toBeUndefined;
    });

    it(`should render HTMLElement <a> with href attribute according to link passed on  props`, () => {
        const {container} = render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        expect(container.firstChild.getAttribute("href")).toBeDefined;
        expect(container.firstChild.getAttribute("href")).toEqual(mockLink);
    });

    it(`should render HTMLElement <a> with attribute target empty when settings state external is false `, () => {
        const {container} = render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        expect(container.firstChild.getAttribute("target")).toBeDefined;
        expect(container.firstChild.getAttribute("target")).toEqual('');
    });

    it(`should render HTMLElement <a> with attribute target blank when settings state external is true`, () => {
        const {container} = render(<CTACustomLink field={mockFieldSettingsStateTrue} language={mockLanguage} link={mockLink}/>);
        expect(container.firstChild.getAttribute("target")).toBeDefined;
        expect(container.firstChild.getAttribute("target")).toEqual('_blank');
    });

    it(`should render HTMLElement <a> with attribute rel empty when settings state external is false `, () => {
        const {container} = render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        expect(container.firstChild.getAttribute("rel")).toBeDefined;
        expect(container.firstChild.getAttribute("rel")).toEqual('');
    });

    it(`should render HTMLElement <a> with attribute rel noopener when settings state external is true`, () => {
        const {container} = render(<CTACustomLink field={mockFieldSettingsStateTrue} language={mockLanguage} link={mockLink}/>);
        expect(container.firstChild.getAttribute("rel")).toBeDefined;
        expect(container.firstChild.getAttribute("rel")).toEqual('noopener');
    });

    it(`should render HTMLElement <a> with classList which does not contain class 'disabled' when settings state disabled is false`, () => {
        const {container} = render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        expect(container.firstChild.classList.contains('disabled')).toBeFalsy;
    });

    it(`should render HTMLElement <a> with classList which contains class 'disabled' when settings state disabled is true`, () => {
        const {container} = render(<CTACustomLink field={mockField} language={mockLanguage} link={mockLink}/>);
        expect(container.firstChild.classList.contains('disabled')).toBeTruthy;
    });

    /*start test e.preventdefault

    Under the hook, fireEvent is calling dispatchEvent,
    so we can take advantage of the fact that calling event.preventDefault returns false if the event is cancelled

    */

    it(`should use preventdefault on click on CTACustomLink when settings state disabled is true`, () => {
        render(<CTACustomLink field={mockFieldSettingsStateTrue} language={mockLanguage} link={mockLink}/>);
        const cta = screen.getByTestId('cta');
        const isPrevented = fireEvent.click(cta);
        expect(isPrevented).toBe(false);
    });

    it(`should not use preventdefault on click on CTACustomLink when settings state disabled is false`, () => {
        render(<CTACustomLink field={mockField} language={mockLanguage}  link={mockLink}/>);
        const cta = screen.getByTestId('cta');
        const isPrevented = fireEvent.click(cta);
        expect(isPrevented).toBe(true);
    });

    /* end test e.preventdefault */
});