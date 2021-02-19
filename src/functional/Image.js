import React from 'react';
import PropTypes from 'prop-types';
import {ImageContainerCommon} from "../styles/common.styled";
import {getImageProps} from "../utils/gettersProperties";
import {getResponsiveKey} from "../utils/functions";
import {generatePictureWebP} from "../utils/gettersCommonElement";

const Image = ({field, language, assetsDirectory, className}) => {
    const responsiveKey = getResponsiveKey(field.content.images[0].asset)[0];
    const image = field.content.images[0];
    const file = image.asset[responsiveKey].fileName ? image.asset[responsiveKey].fileName : null;
    const alt = image.alt && image.alt[language]? image.alt[language] : '';

    if (!file) return null;
    return (
        <ImageContainerCommon {...getImageProps(field)} className={className}>
            { generatePictureWebP(`${assetsDirectory || ''}${ file }`,alt )}
        </ImageContainerCommon>
    )
};

Image.propTypes = {
    field : PropTypes.object,
    language : PropTypes.number,
    assetsDirectory : PropTypes.string,
    className : PropTypes.string
};

export default Image;
