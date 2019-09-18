import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import BlockText from '../../src/components/BlockText';
import { TemplateR, Title } from '../../src/mock/fields';

storiesOf('Components.BlockText', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('BlockText with all props', () => {
        const language = number('Language', 0);
        const fieldsMock = object('Fields', {
            Template: TemplateR,
            Title: Title
        });
        return <BlockText fields={fieldsMock} language={language} />;
    });
