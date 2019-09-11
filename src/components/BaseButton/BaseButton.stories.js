import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import BaseButton from './index';

storiesOf('Components.BaseButton', module)
    .add('default', () => <BaseButton />)
    .add('your Input with Knobs', () => {
        const label = text('Label', 'Add this to list!');

        return <BaseButton content={label} />;
    })
    .add('your Button with Action', () => {
        return <BaseButton onClick={action('clicked')} />;
    })
    .add('your disabled Button', () => (
        <BaseButton disabled={boolean('Disabled', false)} />
    ));
