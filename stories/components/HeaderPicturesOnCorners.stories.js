import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import HeaderPicturesOnCorners from '../../src/components/HeaderPicturesOnCorners';
import { Text, SmallText, Template, Image, Images } from '../../src/mock';

storiesOf('Components.HeaderPicturesOnCorners', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('BlockText with all props', () => {
        const language = number('Language', 0);
        const fieldsMock = object('Fields', {
            Template: Template,
            Title: Text,
            Tagline : SmallText,
            Logo : Image,
            CornerImages : Images
        });
        return <HeaderPicturesOnCorners fields={fieldsMock} language={language} />;
    });
