import React from 'react';
import {render, screen} from '@testing-library/react'
import Text from '../Text';
import {settingsText} from "../../test/mock/fields-data/organism.model.config";

const mockField = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {
            0: "this is a parapgraph"
        }
    },
    settings: settingsText.defaultValue
}

const mockFieldNoContent = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {},
    settings: settingsText.defaultValue
}

const mockLanguage = 0;

describe('functional -  Text', () => {

    it('should return null if field has no text value', () => {
        const {container} = render(<Text field={mockFieldNoContent} language={mockLanguage}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should return null if field has not text value according to language', () => {
        const {container} = render(<Text field={mockField} language={1}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should render text content depending on language', () => {
        render(<Text field={mockField} language={mockLanguage}/>);
        const element = screen.getByText('this is a parapgraph')
        expect(element).toBeTruthy();
    });

    it(`should render HTMLElement <p> with text value depending on language`, () => {
        const {container} = render(<Text field={mockField} language={mockLanguage}/>);
        expect(screen.getByText('this is a parapgraph')).toBeInTheDocument;
        expect(container.querySelector('p')).toBeDefined;
    });
});