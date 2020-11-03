import React from 'react';
import {Container, CallToActions} from './styled';
import PropTypes from 'prop-types';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";
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

        case 'CTA' :
        case 'CTA2' :
            return <CTA key={key} field={fields[field]} language={language}/>;

        default :
            return null;
    }
}

const HeaderBasic = ({fields, order, assetsDirectory, language}) =>  {
        return (
            <Container  {...getTemplatePropsWithImage(fields.Template)}>
                {
                    order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                        : ['Title', 'Tagline', 'Content', 'Image'].map((fieldName, i) =>buildComponent(fields, fieldName, language, assetsDirectory, i))
                }
                {
                    fields['CTA'] || fields['CTA2'] ?
                        <CallToActions
                            responsive={fields['CTA'] ? fields['CTA'].responsiveSettings : ( fields['CTA2'] ?  fields['CTA2'].responsiveSettings : null )}
                            basis={fields['CTA'] ? fields['CTA'].settings.basis : ( fields['CTA2'] ?  fields['CTA2'].settings.basis : null )}
                        >
                            {
                                ['CTA', 'CTA2'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory, i))
                            }
                        </CallToActions>

                        : null
                }
            </Container>
        );
}

HeaderBasic.defaultProps = {};

HeaderBasic.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default HeaderBasic;
