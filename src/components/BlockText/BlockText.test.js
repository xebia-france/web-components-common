import React from 'react';
import { shallow } from 'enzyme';
import BlockText from './BlockText';
import {Template, TextMock, ContentMock} from "../../../stories/mock";
import Text from '../../functional/Text';
import Content from '../../functional/Content';

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
});