import React from 'react';
import {Container, ImageContainer} from './styled';
import PropTypes from 'prop-types';
import {fileNameFromUrl} from "../../utils/functions";
import TextCustomContent from '../../functional/TextCustomContent';
import ContentMarkdownRemark from "../../functional/ContentMarkdownRemark";
import CTACustomLink from "../../functional/CTACustomLink";
import {getImageProps, getTemplatePropsWithImage} from "../../utils/gettersProperties";
import {generatePictureWebP} from "../../utils/gettersCommonElement";

const buildComponent = (fields, field, language, assetsDirectory, data, key) => {
    if (!fields[field]) return
    if (!data) return
    switch (field) {
        case 'Title':
            return <TextCustomContent key={key} field={fields[field]} content={data.name}/>

        case 'Content':
            return <ContentMarkdownRemark key={key} field={fields[field]} content={data.shortPresentation}/>

        case 'Image':
            return getImage(fields[field], assetsDirectory, data);

        case 'CTA':
            return <CTACustomLink animateUnderline key={key} field={fields[field]}
                                  link={data.slug ? `/${data.slug}` : ''}
                                  language={language}/>

        default :
            return null;
    }
}

const getImage = (field, assetsDirectory, data) => {
    if (!data || !data.logo || !data.logo.file) return null;
    return (
        <ImageContainer {...getImageProps(field)}>
            {generatePictureWebP(`${assetsDirectory || ''}${ fileNameFromUrl(data.logo.file.url) }`, data.name)}

        </ImageContainer>);
}

const CardCategory = ({fields, order,language, assetsDirectory, data}) => {
    if (!data) return null
    return (
        <Container {...getTemplatePropsWithImage(fields.Template)} assetsDirectory={assetsDirectory}>
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, data, i))
                    : ['Title', 'Content', 'Image', 'CTA'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, data, i))
            }
        </Container>
    );
}

CardCategory.defaultProps = {};

CardCategory.propTypes = {
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
export default CardCategory;
