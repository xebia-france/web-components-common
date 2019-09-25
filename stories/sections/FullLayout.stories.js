import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Template } from '../../src/mock'
import FullLayout from '../../src/sections/FullLayout';

storiesOf('Sections.FullLayout', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('default', () => <FullLayout><p>FullLayout sections</p></FullLayout>)
    .add('Section with background', () => {
        const fieldsMock = object('Fields', {
            Template: Template
        });
        return (<FullLayout fields={fieldsMock}>
            <p>FullLayout sections</p>
        </FullLayout>);
    });
