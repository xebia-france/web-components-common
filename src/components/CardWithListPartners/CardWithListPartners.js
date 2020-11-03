import React from 'react';
import {Wrapper, Container} from './styled';
import Text from '../../functional/Text';
import Content from '../../functional/Content';
import CTA from '../../functional/CTA'
import Image from "../../functional/Image";
import CardPartner from './CardPartner';
import {getTemplatePropsWithImage, getContentProps} from "../../utils/gettersProperties";

const buildComponent = (fields, field,language,assetsDirectory, data,  key) => {
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

        case 'CTA':
            return <CTA key={key} field={fields[field]} language={language}/>;


        case 'Partners':
            const FlexContainer = fields.FlexContainer;
            return <Container
                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                {
                    data.map((partner, i) => {
                        return <CardPartner
                            key={i}
                            config={fields.Partners}
                            configCard={fields.TemplateCard}
                            partner={partner} i={i}
                            assetsDirectory={assetsDirectory}/>
                    })
                }
            </Container>;
        default :
            return null;
    }
}

const CardWithListPartners = ({fields, order, assetsDirectory, language, data}) => {
    const ContentBold = fields.ContentBold ?  {...getContentProps(fields.ContentBold)} : null;

    return (
        <Wrapper  {...getTemplatePropsWithImage(fields.Template)} contentBold={ContentBold} assetsDirectory={assetsDirectory}>
            {
                order ? order.map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory,data, i))
                    : ['Title', 'Tagline', 'Content', 'Image', 'CTA', 'Partners'].map((fieldName, i) => buildComponent(fields, fieldName, language, assetsDirectory,data, i))
            }
        </Wrapper>
    );
}

CardWithListPartners.defaultProps = {}

export default CardWithListPartners;