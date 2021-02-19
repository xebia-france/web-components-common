import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import BlockText from './BlockText';
import {
    settingsTagline,
    settingsTemplate,
    settingsText,
    settingsTitle
} from "../../test/mock/fields-data/organism.model.config";



const mockFields = {
    Template : {
        content : {},
        responsiveSettings: ['M', 'T', 'D'],
        settings : settingsTemplate.defaultValue
    },
    Title : {
        content : {
            text: {
                0: 'title',
            }
        },
        responsiveSettings: ['M', 'T', 'D'],
        settings : settingsTitle.defaultValue
    },
    Tagline : {
        content : {
            text: {
                0: 'tagline',
            }
        },
        responsiveSettings: ['M', 'T', 'D'],
        settings : settingsTagline.defaultValue
    },
    Content : {
        content : {
            html: {
                0: '<p>content</p'
            }
        },
        responsiveSettings: ['M', 'T', 'D'],
        settings : settingsText.defaultValue
    }
}

const mockLanguage = 0;

describe('BlockText', () => {
    it('should render correctly', () => {
        render(<BlockText language={mockLanguage} fields={mockFields} order={['Title', 'Tagline', 'Content']}/>)
        expect(screen.getByTestId('blocktext-container')).toBeDefined;
        // screen.debug()
    });

    it('should render component with all child by default when order prop is not defined', () => {
        const {container} = render(<BlockText language={mockLanguage} fields={mockFields}/>)
        const childNodes = container.firstChild.childNodes;

        expect(childNodes.length).toEqual(3);

        expect(container.firstChild.querySelector('h2')).toStrictEqual(childNodes[0]);
        expect(container.firstChild.querySelector('h4')).toStrictEqual(childNodes[1]);
        expect(container.firstChild.querySelector('div')).toStrictEqual(childNodes[2]);
    });

    it('should render component with only child defined on order property ', () => {
        const {container} = render(<BlockText language={mockLanguage} fields={mockFields} order={['Title']}/>)
        const childNodes = container.firstChild.childNodes;

        expect(childNodes.length).toEqual(1);
        expect(container.firstChild.querySelector('h2')).toStrictEqual(childNodes[0]);
    });

    it('should render component with only child defined on order property ', () => {
        const {container} = render(<BlockText language={mockLanguage} fields={mockFields} order={['Title','Tagline']}/>)

        const childNodes = container.firstChild.childNodes;

        expect(childNodes.length).toEqual(2);
        expect(container.firstChild.querySelector('h2')).toStrictEqual(childNodes[0]);
        expect(container.firstChild.querySelector('h4')).toStrictEqual(childNodes[1]);
    });

    it('should render component with children order according to order property', () => {
        const {container} = render(<BlockText language={mockLanguage} fields={mockFields} order={['Title','Content','Tagline']}/>)

        const childNodes = container.firstChild.childNodes;
        expect(childNodes.length).toEqual(3);

        expect(container.firstChild.querySelector('h2')).toStrictEqual(childNodes[0]);
        expect(container.firstChild.querySelector('div')).toStrictEqual(childNodes[1]);
        expect(container.firstChild.querySelector('h4')).toStrictEqual(childNodes[2]);
    });

    it('should render component with child null when fieldName passed on order prop does not correspond with any existant field', () => {
        const {container} = render(<BlockText language={mockLanguage} fields={mockFields} order={['Test']}/>)

        const childNodes = container.firstChild.childNodes;

        expect(childNodes.length).toEqual(0);
        expect(childNodes[0]).toBeNull;

        //screen.debug()
    });
})


/*
const fieldsMock =  {
    Template: {
        content: {},
        responsiveSettings: ['A'],
        settings : Template
    },
    Title: TextMock,
    Tagline: TextMock,
    Content : ContentMock
};

describe('BlockText', () => {
    it('should render correctly', () => {
        const component = shallow(<BlockText fields={fieldsMock} language={0}/>);

        expect(component).toMatchSnapshot();
    });
});

describe('BlockText', () => {
    it('should render correctly title with order prop', () => {
        const component = shallow(<BlockText order={['Title']} fields={fieldsMock} language={0}/>);

        expect(component.find(Text)).toHaveLength(1);
    });
});

describe('BlockText', () => {
    it('should render correctly Title and Tagline with order prop', () => {
        const component = shallow(<BlockText order={['Title', 'Tagline']} fields={fieldsMock} language={0}/>);

        expect(component.find(Text)).toHaveLength(2);
    });
});

describe('BlockText', () => {
    it('should render correctly Title,Tagline, Content  and respect order prop', () => {
        const component = shallow(<BlockText order={['Title', 'Tagline', 'Content']} fields={fieldsMock} language={0}/>);

        expect(component.find(Text)).toHaveLength(2);
        expect(component.find(Content)).toHaveLength(1);
    });
});

describe('BlockText', () => {
    it('should render correctly order of children', () => {
        const component = shallow(<BlockText order={['Title', 'Content', 'Tagline']} fields={fieldsMock} language={0}/>);
        expect(component.childAt(0).is(Text)).toBeTruthy()
        expect(component.childAt(1).is(Content)).toBeTruthy()
        expect(component.childAt(2).is(Text)).toBeTruthy()
    });
});

describe('BlockText', () => {
    it('should render only element declare on props order', () => {
        const component = shallow(<BlockText order={['Title']} fields={fieldsMock} language={0}/>);
        expect(component.children()).toHaveLength(1);
    });
});

describe('BlockText', () => {
    it('should render all elements without  props order', () => {
        const component = shallow(<BlockText fields={fieldsMock} language={0}/>);
        expect(component.children()).toHaveLength(3);
    });
});*/