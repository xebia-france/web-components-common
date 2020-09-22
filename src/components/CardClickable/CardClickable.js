import React, {Component} from 'react';
import {Container, Text, Content, ImageContainer} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <Text
                key={key}
                responsive={fields[field].responsiveSettings}
                typography={fields[field].settings.typography}
                basis={fields[field].settings.basis}
                border={fields[field].settings.border}
                as={fields[field].settings.seo.tag || 'h2'}
            >
                {fields[field].content.text ? fields[field].content.text[language] : ''}
            </Text>;

        case 'Tagline':
            return <Text
                key={key}
                responsive={fields[field].responsiveSettings}
                typography={fields[field].settings.typography}
                basis={fields[field].settings.basis}
                border={fields[field].settings.border}
                as={fields[field].settings.seo.tag || 'h2'}
            >
                {fields[field].content.text ? fields[field].content.text[language] : ''}
            </Text>;

        case 'Content':
            return <Content
                key={key}
                responsive={fields[field].responsiveSettings}
                typography={fields[field].settings.typography}
                basis={fields[field].settings.basis}
                dangerouslySetInnerHTML={{
                    __html: fields[field].content.html ? fields[field].content.html[language] :
                        <p></p>
                }}
            />

        case 'Image':
            return getImages(fields[field], language, assetsDirectory);

        default :
            return null;
    }
}

const getImages = (field, language, assetsDirectory) => {
    const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
    return field.content.images.map((image, i) => {
        const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
        if (!file) {
            return null
        } else {
            return (
                <ImageContainer key={i}
                                responsive={field.responsiveSettings}
                                basis={field.settings.basis}
                                border={field.settings.border}>
                    <img alt={image.alt[language]} src={`${assetsDirectory || ''}${ file }`}/>
                </ImageContainer>);
        }
    });
}

const CardClickable = ({fields, order, assetsDirectory, language}) => {
    const Template = fields.Template;
    const Link = fields.Link;

    return (
        <Container responsive={Template ? Template.responsiveSettings : []}
                   responsiveContent={getResponsiveKey(Template.content.images[0].asset)}
                   asset={Template.content.images[0].asset || null}
                   assetsDirectory={assetsDirectory}
                   as={Link && Link.content.link[language] ? 'a' : 'div'}
                   target={Link && Link.settings.state.external ? '_blank' : ''}
                   rel={Link && Link.settings.state.external ? 'noopener' : ''}
                   href={Link && Link.content.link[language] ? Link.content.link[language] : ''}
                   onClick={(e) => {
                       if (!Link || (Link && !Link.content.link[language]) || (Link && Link.settings.state.disabled)) e.preventDefault();
                   }}
                   basis={Template && Template.settings ? Template.settings.basis : {}}
                   border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
        >
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                    : ['Title', 'Tagline', 'Content', 'Image'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
            }
        </Container>
    );
}


CardClickable.defaultProps = {};

CardClickable.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        Title: PropTypes.object,
        Tagline: PropTypes.object,
        Content: PropTypes.object,
        Image: PropTypes.object
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};

export default CardClickable;
