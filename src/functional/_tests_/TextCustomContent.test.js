import React from 'react';
import {render, screen} from '@testing-library/react'
import TextCustomContent from '../TextCustomContent';
import {settingsText} from "../../test/mock/fields-data/organism.model.config";

const mockField = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {},
    settings: settingsText.defaultValue
}

describe('functional -  TextCustomContent', () => {

    it('should return null if field has no text value', () => {
        const {container} = render(<TextCustomContent field={mockField}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should render text content depending on language', () => {
        render(<TextCustomContent field={mockField} content={'this is a parapgraph'}/>);
        const element = screen.getByText('this is a parapgraph')
        expect(element).toBeTruthy();
    });

    it(`should render HTMLElement <p> with text value depending on language`, () => {
        const {container} = render(<TextCustomContent field={mockField} content={'this is a parapgraph'}/>);
        expect(screen.getByText('this is a parapgraph')).toBeInTheDocument;
        expect(container.querySelector('p')).toBeDefined;
    });
});