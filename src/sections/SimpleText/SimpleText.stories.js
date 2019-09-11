import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import SimpleText from './index';

storiesOf('Sections.Text', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('default', () => <SimpleText />)
    .add('Text and Input with Knobs', () => {
        const name = text('Name', 'React App');
        const level = number('Level', 3);

        const content = `This is a ${ name } and it has Level ${ level } .`;

        return <SimpleText content={content} />;
    })
    .add('Input with Knobs', () => {
        const input = text('Input', 'Type away ...');

        return <SimpleText content={input} />;
    });
