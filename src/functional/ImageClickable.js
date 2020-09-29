import React from 'react';
import PropTypes from 'prop-types';
import {ImageContainerCommon} from "../styles/common.styled";
import {getImageProps} from "../utils/gettersProperties";
import {getResponsiveKey} from "../utils/functions";
import {generatePictureWebP} from "../utils/gettersCommonElement";

const ImageClickable = ({field, language, assetsDirectory, className, Link}) => {
    const responsiveKey = getResponsiveKey(field.content.images[0].asset)[0];
    const image = field.content.images[0];
    const file = image.asset[responsiveKey].fileName ? image.asset[responsiveKey].fileName : null;
    const alt = image.alt && image.alt[language]? image.alt[language] : '';

    if (!file) return null;
    if(!Link){
        return (
            <ImageContainerCommon {...getImageProps(field)} className={className}>
                { generatePictureWebP(`${assetsDirectory || ''}${ file }`,alt )}
            </ImageContainerCommon>
        )
    }else{
        return (
            <ImageContainerCommon {...getImageProps(field)} className={className}
                                  as={Link && Link.content.link[language] ? 'a' : 'div'}
                                  target={Link && Link.settings.state.external ? '_blank' : ''}
                                  rel={Link && Link.settings.state.external ? 'noopener' : ''}
                                  href={Link && Link.content.link[language] ? Link.content.link[language] : ''}
                                  onClick={(e) => {
                                      if (!Link || (Link && !Link.content.link[language]) || (Link && Link.settings.state.disabled)) e.preventDefault();
                                  }}
            >
                { generatePictureWebP(`${assetsDirectory || ''}${ file }`,alt )}
            </ImageContainerCommon>
        )
    }

};

ImageClickable.defaultProps = {}

export default ImageClickable;
