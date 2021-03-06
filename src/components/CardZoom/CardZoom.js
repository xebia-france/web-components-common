import React from 'react';
import {Container} from './styled';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";
import ImageClickable from '../../functional/ImageClickable';

import PropTypes from 'prop-types';
import {getContentProps, getTemplatePropsWithImage} from "../../utils/gettersProperties";


const buildComponent = (fields, field,language,assetsDirectory,  key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Tagline':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Content':
            return <Content key={key} field={fields[field]} language={language}/>;

        case 'Image':
            const Link = fields.CTA;
            return <ImageClickable key={key} field={fields[field]} language={language}
                          assetsDirectory={assetsDirectory} Link={Link && Link.content.link[language] && !Link.settings.state.disabled ? Link : null}/>

        case 'CTA':
            return <CTA key={key} field={fields[field]} language={language}/>;
        default :
            return null;
    }
}

const CardZoom = ({fields, order, assetsDirectory, language}) => {
        const Link = fields.CTA;
        const ContentBold = fields.ContentBold ?  {...getContentProps(fields.ContentBold)} : null;

        return (
            <Container  {...getTemplatePropsWithImage(fields.Template)} contentBold={ContentBold} assetsDirectory={assetsDirectory}
                        target={Link && Link.settings.state.external ? '_blank' : ''}
                        rel={Link && Link.settings.state.external ? 'noopener' : ''}
                        href={Link && Link.content.link[language] ? Link.content.link[language] : ''}
                        onClick={(e) => {
                            if (!Link || (Link && !Link.content.link[language]) || (Link && Link.settings.state.disabled)) e.preventDefault();
                        }}
                        disabledLink={Link && Link.settings.state.disabled ? true  : false}
            >
                {
                    order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                        : ['Title', 'Tagline', 'Content', 'Image', 'CTA'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                }
            </Container>
        );
}


CardZoom.defaultProps = {};

CardZoom.propTypes = {
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
export default CardZoom;
