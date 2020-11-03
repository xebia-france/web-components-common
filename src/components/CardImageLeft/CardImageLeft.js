import React from 'react';
import {Container, RightContent, ImageBackground} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'

const getImages = (field, language, assetsDirectory) => {
    const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
    return field.content.images.map((image, i) => {
        const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
        if (!file) {
            return null
        } else {
            return (
                <ImageBackground
                    key={i}
                    responsive={field.responsiveSettings}
                    basis={field.settings.basis}
                    border={field.settings.border}
                    alt={image.alt[language]}
                    assetsDirectory={assetsDirectory}
                    asset={file}
                />
            )
        }
    });
}

const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Tagline':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Content':
            return <Content key={key} field={fields[field]} language={language}/>;
        case 'CTA':
            return <CTA key={key} field={fields[field]} language={language}/>;
        default :
            return null;
    }
}

const CardImageLeft = ({fields, order, assetsDirectory, language}) => {
    return (
        <Container{...getTemplatePropsWithImage(fields.Template)}>
            {fields.Image ? getImages(fields.Image, language, assetsDirectory) : null}
            <RightContent>
                {
                    order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                        : ['Title', 'Tagline', 'Content', 'CTA'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                }
            </RightContent>
        </Container>
    );
}

CardImageLeft.defaultProps = {};

CardImageLeft.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        Title: PropTypes.object,
        Tagline: PropTypes.object,
        Content: PropTypes.object,
        Image: PropTypes.object,
        CTA: PropTypes.object
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};
export default CardImageLeft;