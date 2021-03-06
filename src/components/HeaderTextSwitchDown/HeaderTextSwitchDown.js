import React from 'react';
import {Container, CallToActions, Contain, TextHeading} from './styled';
import PropTypes from 'prop-types';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";
import {getTemplatePropsWithImage, getTextProps} from "../../utils/gettersProperties";

const HeadingElement = ({field, language}) => {
    const content = field.content.text ? field.content.text[language] : null
    if (!content) return null;
    return (<TextHeading {...getTextProps(field)}>{content}</TextHeading>);
};

const buildComponent = (fields, field, language, assetsDirectory, key) => {
    if (!fields[field]) return
    switch (field) {
        case 'Title':
            return <HeadingElement key={key} field={fields[field]} language={language}/>;

        case 'Tagline':
            return <HeadingElement key={key} field={fields[field]} language={language}/>;

        case 'Content':
            return <Content key={key} field={fields[field]} language={language}/>;

        case 'Image':
            return <Image key={key} field={fields[field]} language={language}
                          assetsDirectory={assetsDirectory}/>

        case 'CTA' :
        case 'CTA2' :
            return <CTA key={key} field={fields[field]} language={language}/>;

        default :
            return null;
    }
}

const HeaderTextSwitchDown = ({fields, order, assetsDirectory, language}) => {

    return (
        <Container {...getTemplatePropsWithImage(fields.Template)} assetsDirectory={assetsDirectory}>
            <Contain>
                {
                    order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                        : ['Title', 'Tagline', 'Content', 'Image'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                }
                {
                    fields['CTA'] || fields['CTA2'] ?
                        <CallToActions
                            responsive={fields['CTA'] ? fields['CTA'].responsiveSettings : (fields['CTA2'] ? fields['CTA2'].responsiveSettings : null)}
                            basis={fields['CTA'] ? fields['CTA'].settings.basis : (fields['CTA2'] ? fields['CTA2'].settings.basis : null)}
                        >
                            {
                                ['CTA', 'CTA2'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                            }
                        </CallToActions>

                        : null
                }
            </Contain>
        </Container>
    );
}

HeaderTextSwitchDown.defaultProps = {};

HeaderTextSwitchDown.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default HeaderTextSwitchDown;
