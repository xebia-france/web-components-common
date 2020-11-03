import React from 'react';
import {Container, LinedCTA} from './styled';
import PropTypes from 'prop-types';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import Image from "../../functional/Image";
import CTA from '../../functional/CTA'
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";

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
            return <Image key={key} field={fields[field]} language={language}
                          assetsDirectory={assetsDirectory}/>

        case 'DupCTA' :
            return getAllCTA(fields,language);

        default :
            return null;
    }
}

const getAllCTA = (fields, language) => {
    return (<LinedCTA>
        {
            Object.keys(fields).map((key, i) => {
                if (key.includes('DupCTA')) {
                    return Object.assign(fields[key])
                }
            }).filter(el => el)
                .map((cta, i) => <CTA key={i} field={cta} language={language}/>)
        }
    </LinedCTA>)
}

const CardCTALinedUp  = ({fields, order, assetsDirectory, language}) => {
    return (
        <Container {...getTemplatePropsWithImage(fields.Template)} assetsDirectory={assetsDirectory}>
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                    : ['Title', 'Tagline', 'Content', 'Image', 'DupCTA'].map((fieldName, i) =>  buildComponent(fields, fieldName, language, assetsDirectory, i))
            }
        </Container>
    );
}

CardCTALinedUp.defaultProps = {};

CardCTALinedUp.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default CardCTALinedUp;
