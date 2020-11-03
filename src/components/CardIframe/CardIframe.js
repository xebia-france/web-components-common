import React from 'react';
import {Container, Iframe} from './styled';
import PropTypes from 'prop-types';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";

const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Tagline':
            return <Text key={key} field={fields[field]} language={language}/>;

        case 'Content':
            return <Content key={key} field={fields[field]} language={language}/>;

        case 'Image':
            return <Image key={key} field={fields[field]} language={language}
                          assetsDirectory={assetsDirectory}/>

        case 'Iframe':
            return <Iframe
                key={key}
                responsive={fields[field].responsiveSettings}
                basis={fields[field].settings.basis}
                dangerouslySetInnerHTML={{
                    __html: fields[field].content.html ? fields[field].content.html[language] :
                        <p></p>
                }}
            />

        case 'CTA':
            return <CTA key={key} field={fields[field]} language={language}/>;
        default :
            return null;
    }
}

const CardIframe = ({fields, order, assetsDirectory, language}) => {
    return (
        <Container  {...getTemplatePropsWithImage(fields.Template)}>
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                    : ['Title', 'Tagline', 'Content', 'Image', 'CTA', 'Iframe'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
            }
        </Container>
    );
}

CardIframe.defaultProps = {};

CardIframe.propTypes = {
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
export default CardIframe;
