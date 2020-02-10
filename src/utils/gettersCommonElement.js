import React from 'react';
import {getResponsiveKey} from "./functions";
import {ImageContainerCommon} from '../styles/common.styled'

const getImages = (field, language) => {
    const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
    return field.content.images.map((image, i) => {
        const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
        if (!file) {
            return null
        } else {
            return (
                <ImageContainerCommon key={i}
                                      responsive={field.responsiveSettings}
                                      basis={field.settings.basis}>
                    <img alt={image.alt[language]}
                         src={file.startsWith('https://') ? file : `/assets/${ file }`}/>
                </ImageContainerCommon>);
        }
    });
}

export {
    getImages
}