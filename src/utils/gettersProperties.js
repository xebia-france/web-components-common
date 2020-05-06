import {getResponsiveKey} from "./functions";

const getTemplateProps = (field) => {
    return {
        responsive: field ? field.responsiveSettings : [],
        basis: field && field.settings ? field.settings.basis : null,
        border: field && field.settings && field.settings.border ? field.settings.border : null
    }
}

const getTemplatePropsWithImage = (field) => {
    return {
        responsive: field ? field.responsiveSettings : [],
        responsiveContent: getResponsiveKey(field.content.images[0].asset),
        asset: field.content.images[0].asset || null,
        basis: field && field.settings ? field.settings.basis : null,
        border: field && field.settings && field.settings.border ? field.settings.border : null
    }
}


const getTextProps = (field) => {
    return {
        responsive: field ? field.responsiveSettings : [],
        typography: field && field.settings.typography ? field.settings.typography : null,
        basis: field && field.settings.basis ?  field.settings.basis : null,
        border: field && field.settings.border ? field.settings.border  : null,
        as: field && field.settings.seo ? field.settings.seo.tag : 'p'
    }
}

const getContentProps = (field) => {
    return {
        responsive: field.responsiveSettings,
        typography: field.settings.typography,
        basis: field.settings.basis
    }
}

const getCTAProps = (field) => {
    return {
        responsive: field.responsiveSettings,
        basis: field.settings.basis,
        typography: field.settings.typography,
        border: field.settings.border,
        icon: field.settings.icon
    }
}

const getImageProps = (field) => {
    return {
        responsive: field.responsiveSettings,
        basis: field.settings.basis,
        border: field.settings.border
    }
}


export {
    getTemplateProps,
    getTemplatePropsWithImage,
    getTextProps,
    getContentProps,
    getCTAProps,
    getImageProps
}