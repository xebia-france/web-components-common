import React from 'react';
import {Container} from './styled';
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

        case 'CTA' :
        case 'CTA2' :
        case 'CTA3' :
        case 'CTA4' :
            return <CTA key={key} field={fields[field]} language={language}/>;

        default :
            return null;
    }
}

const CardMultiCTA = ({fields, order, assetsDirectory, language}) => {
    return (
        <Container  {...getTemplatePropsWithImage(fields.Template)}>
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                    : ['Title', 'Tagline', 'Content', 'Image', 'CTA', 'CTA2', 'CTA3', 'CTA4'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
            }
        </Container>
    );
}

CardMultiCTA.defaultProps = {};

CardMultiCTA.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default CardMultiCTA;
