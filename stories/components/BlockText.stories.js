import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import BlockText from '../../src/components/BlockText';
import { Template, Text } from '../../src/mock';

storiesOf('Components.BlockText', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('BlockText with all props', () => {
        const language = number('Language', 0);
        const fieldsMock = object('Fields', {
            Template: Template,
            Title: Text
        });
        return <BlockText fields={fieldsMock} language={language} />;
    });
