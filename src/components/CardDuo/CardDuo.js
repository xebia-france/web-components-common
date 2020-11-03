import React from 'react';
import {Container, SubContainer, Card, PrevContainer, ImageContainer, Between} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";
import {generatePictureWebP} from "../../utils/gettersCommonElement";
import {getTemplatePropsWithImage} from "../../utils/gettersProperties";
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'

const getImages = (field, assetsDirectory, language )=> {
    const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
    return field.content.images.map((image, i) => {
        const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
        if (!file) {
            return null
        } else {
            return (
                <PrevContainer>
                    <ImageContainer key={i}
                                    responsive={field.responsiveSettings}
                                    basis={field.settings.basis}
                                    border={field.settings.border}>
                        {generatePictureWebP(`${assetsDirectory || ''}${ file }`, image.alt[language])}
                    </ImageContainer>
                </PrevContainer>);
        }
    });
}

const buildComponent = (fields, field, language, assetsDirectory, key, nbrCard) => {
    if (!fields[field]) return
    switch (field) {
        case `Title${nbrCard}`:
            return <Text key={`${key}-${nbrCard}`} field={fields[field]} language={language}/>;

        case `Tagline${nbrCard}`:
            return <Text key={`${key}-${nbrCard}`} field={fields[field]} language={language}/>;

        case `Content${nbrCard}` :
            return <Content key={`${key}-${nbrCard}`} field={fields[field]} language={language}/>;

        case `Image${nbrCard}` :
            return getImages(fields[field], assetsDirectory, language);

        case `CTA${nbrCard}`:
            return <CTA key={`${key}-${nbrCard}`} field={fields[field]} language={language}/>;

        default :
            return null;
    }

}
const CardDuo = ({fields, order, assetsDirectory, language}) => {
    const Template = fields.Template;
    return (
        <Container>
            <Card {...getTemplatePropsWithImage(fields.Template)} assetsDirectory={assetsDirectory}>
                {
                    fields.Image ? getImages(fields.Image, assetsDirectory, language) : null
                }
                <SubContainer>
                    {
                        order && order[0] ? order[0].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i, ''))
                            : ['Title', 'Tagline', 'Content', 'CTA'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i, ''))
                    }
                </SubContainer>
            </Card>
            <Between {...getTemplatePropsWithImage(fields.Separator)}
                     basisParent={Template && Template.settings ? Template.settings.basis : {}}
                     assetsDirectory={assetsDirectory}>
                <div/>
            </Between>
            <Card {...getTemplatePropsWithImage(fields.Template2)} assetsDirectory={assetsDirectory}>
                { fields.Image2 ? getImages(fields.Image2, assetsDirectory, language) : null }
                <SubContainer>
                    {
                        order && order[1] ? order[1].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i, '2'))
                            : ['Title2', 'Tagline2', 'Content2', 'CTA2'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i, '2'))
                    }
                </SubContainer>
            </Card>
        </Container>
    );
}

CardDuo.defaultProps = {};

CardDuo.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default CardDuo;
