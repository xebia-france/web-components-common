import React from 'react';
import {Container} from './styled';
import PropTypes from 'prop-types';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";

const getAllCTA = (fields, field, language) => {
    return Object.keys(fields).map((key, i) => {
        if (key.includes('DupCTA')) {
            return Object.assign(fields[key])
        }
    }).filter(el => el)
        .map((cta, i) => <CTA key={i} field={cta} language={language} animateUnderline={cta.settings.state && cta.settings.state.animation && cta.settings.state.animation === 'underline' ? true : false }/>);
}

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

        case 'DupCTA':
            return getAllCTA(fields, field, language)
        default :
            return null;
    }
}

const CardDuplicableCTA = ({fields, order, assetsDirectory, language}) => {
    return (
        <Container {...getTemplatePropsWithImage(fields.Template)}>
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                    : ['Title', 'Tagline', 'Content', 'Image', 'DupCTA'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
            }
        </Container>
    );
}

CardDuplicableCTA.defaultProps = {};

CardDuplicableCTA.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default CardDuplicableCTA;
