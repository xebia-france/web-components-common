import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../functional/Text';
import {Container, ImageCorner, Logo} from './styled';
import {getResponsiveKey} from '../../utils/functions';
import {generatePictureWebP} from "../../utils/gettersCommonElement";
import {getImageProps, getTemplateProps} from "../../utils/gettersProperties";

const getCornerImages = (field, language, assetsDirectory) => {
    const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
    return field.content.images.map((image, i) => {
        const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
        if (!file) return <ImageCorner key={i} responsive={field.responsiveSettings} basis={field.settings.basis}
                                       index={i + 1}/>;

        return (
            <ImageCorner key={i} responsive={field.responsiveSettings} basis={field.settings.basis} index={i + 1}>
                {generatePictureWebP(`${assetsDirectory || ''}${ file }`, image.alt[language])}
            </ImageCorner>);
    });
}

const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'CornerImages' :
            return getCornerImages(fields[field], language, assetsDirectory);

        case 'Tagline' :
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Image' :
            return <Logo key={key}
                         role={'img'}
                         {...getImageProps(field)}
                         alt={fields[field].content.images[0].alt[language]}
                         responsiveContent={getResponsiveKey(fields[field].content.images[0].asset)}
                         asset={fields[field].content.images[0].asset}
                         assetsDirectory={assetsDirectory}/>;
        default :
            return null;
    }
}

const HeaderPicturesOnCorners = ({fields, order, assetsDirectory, language}) => {
    return (
        <Container {...getTemplateProps(fields.Template)}>
            {
                order ? ['CornerImages', ...order].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                    : ['CornerImages', 'Image', 'Title', 'Tagline'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
            }
        </Container>
    );
};

HeaderPicturesOnCorners.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default HeaderPicturesOnCorners;
