import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Template } from '../mock'
import BasicLayout from '../../src/sections/BasicLayout';

import styled from 'styled-components';
import { theme} from "../../src/styles/constants";

const Child = styled.div`
    background: ${ theme.grey40};
`

storiesOf('Sections.ListSpeakersFlipCard', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('default', () => <BasicLayout><div>BasicLayout sections</div></BasicLayout>)
    .add('Section with background', () => {
        const fieldsMock = object('Fields', {
            Template: Template
        });
        return (<BasicLayout fields={fieldsMock}>
            <Child>Child</Child>
        </BasicLayout>);
    });
