import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, object } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import HeaderPicturesOnCorners from '../../src/components/HeaderPicturesOnCorners';
import { TextMock, SmallText, Template, Image, Images } from '../mock';

storiesOf('Components.HeaderPicturesOnCorners', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('ListSpeakersFlipCard with all props', () => {
        const language = number('Language', 0);
        const fieldsMock = object('Fields', {
            Template: Template,
            Title: TextMock,
            Tagline : SmallText,
            Logo : Image,
            CornerImages : Images
        });
        return <HeaderPicturesOnCorners fields={fieldsMock} language={language} />;
    });
