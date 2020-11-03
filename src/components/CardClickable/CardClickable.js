import React from 'react';
import {Container} from './styled';
import PropTypes from 'prop-types';
import {getContentProps, getTemplatePropsWithImage} from "../../utils/gettersProperties";
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import Image from "../../functional/Image";

const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return  <Text key={key} field={fields[field]} language={language}/>;

        case 'Tagline':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Content':
            return <Content key={key} field={fields[field]} language={language}/>;

        case 'Image':
            return <Image key={key} field={fields[field]} language={language}
                          assetsDirectory={assetsDirectory}/>
        default :
            return null;
    }
}

const CardClickable = ({fields, order, assetsDirectory, language}) => {
    const Link = fields.Link;
    const ContentBold = fields.ContentBold ?  {...getContentProps(fields.ContentBold)} : null;

    return (
        <Container {...getTemplatePropsWithImage(fields.Template)}
                   contentBold={ContentBold}
                   assetsDirectory={assetsDirectory}
                   as={Link && Link.content.link[language] ? 'a' : 'div'}
                   target={Link && Link.settings.state.external ? '_blank' : ''}
                   rel={Link && Link.settings.state.external ? 'noopener' : ''}
                   href={Link && Link.content.link[language] ? Link.content.link[language] : ''}
                   onClick={(e) => {
                       if (!Link || (Link && !Link.content.link[language]) || (Link && Link.settings.state.disabled)) e.preventDefault();
                   }}
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
