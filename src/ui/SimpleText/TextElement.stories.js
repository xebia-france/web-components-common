import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import TextElement from './index';

storiesOf('UI.TextElement', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('default', () => <TextElement />)
    .add('Text and Input with Knobs', () => {
        const name = text('Name', 'React App');
        const level = number('Level', 3);

        const content = `This is a ${ name } and it has Level ${ level } .`;

        return <TextElement content={content} />;
    })
    .add('Input with Knobs', () => {
        const input = text('Input', 'Type away ...');

        return <TextElement content={input} />;
    });
