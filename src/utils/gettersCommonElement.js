import React from 'react';
import {getResponsiveKey} from "./functions";
import {ImageContainerCommon} from '../styles/common.styled'
import { extractWithoutExtension, getExtensionFileName} from "./functions";

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


const generatePictureWebP = (src, alt) => {
    const extension = getExtensionFileName(src);
    const srcWithoutExtension = extractWithoutExtension(src);

    console.log('extension : ', extension);
    console.log('srcWithoutExtension : ', srcWithoutExtension);

    if(extension === 'png'){
        return (
            <picture>
                <source type={'image/webp'} srcSet={`${srcWithoutExtension}.webp`}/>
                <source type={'image/png'} srcSet={src}/>
                <img alt={alt} src={src}/>
            </picture>
        )
    }
    else if (extension === 'jpeg' || extension === 'jpg') {
        return (
            <picture>
                <source type={'image/webp'} srcSet={`${srcWithoutExtension}.webp`}/>
                <source type={'image/jpeg'} srcSet={src}/>
                <img alt={alt} src={src}/>
            </picture>
        )
    }
    else {
        return (<img alt={alt} src={src}/>)
    }


}

export {
    getImages, generatePictureWebP
}