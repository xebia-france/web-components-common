import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react'
import ContentMarkdownRemark from '../ContentMarkdownRemark';
import {settingsText} from "../../test/mock/fields-data/organism.model.config";


const mockField = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {},
    settings: settingsText.defaultValue
}

const mockContent = {
    childMarkdownRemark: {
        html: "<p>this is a parapgraph</p>"
    }
}


describe('functional -  ContentMarkdownRemark', () => {
    it('should return ok', () => {
        expect(true).toEqual(true);
    });
    it('should return null if field has not html value according to content passed on props', () => {
        const {container} = render(<ContentMarkdownRemark field={mockField} content={mockField.content}/>);
        expect(container.firstChild).toEqual(null);
    });

    it('should render html content depending on language', () => {
        render(<ContentMarkdownRemark field={mockField} content={mockContent}/>);
        const element = screen.getByText('this is a parapgraph')
        expect(element).toBeTruthy();
    });

    it('should render html depending on language', () => {
        const {container} = render(<ContentMarkdownRemark field={mockField} content={mockContent}/>);
        expect(screen.getByText('this is a parapgraph')).toBeInTheDocument;
        expect(container.querySelector('p')).toBeDefined;
    });
});