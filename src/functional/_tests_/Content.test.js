import React from 'react';
import {render, screen} from '@testing-library/react'
import Content from '../Content';
import {settingsText} from "../../test/mock/fields-data/organism.model.config";

const mockField = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        html: {
            0: "<p>this is a parapgraph</p>"
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

describe('functional -  Content', () => {

    it('should return null if field has no html value', () => {
        const {container} = render(<Content field={mockFieldNoContent} language={mockLanguage}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should return null if field has not html value according to language', () => {
        const {container} = render(<Content field={mockField} language={1}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should render html content depending on language', () => {
        render(<Content field={mockField} language={mockLanguage}/>);
        const element = screen.getByText('this is a parapgraph')
        expect(element).toBeTruthy();
    });

    it('should render html depending on language', () => {
        const {container} = render(<Content field={mockField} language={mockLanguage}/>);
        expect(screen.getByText('this is a parapgraph')).toBeInTheDocument;
        expect(container.querySelector('p')).toBeDefined;
    });
});