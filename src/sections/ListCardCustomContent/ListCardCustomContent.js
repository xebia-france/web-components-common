import React from 'react';
import {Wrapper, Container} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import Card from './Card';

const ListCardCustomContent = ({children, fields, name, assetsDirectory, data, language, locale}) => {


        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;
        const CTA = fields.CTA ;


        return (
            <Wrapper id={removeSpaces(name)}
                     asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                     responsive={Template ? Template.responsiveSettings : null}
                     basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            >
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                    {
                        data.map((content, i) => {
                            return <Card
                                key={i}
                                config={fields.CustomContentType}
                                configCard={fields.TemplateCard}
                                data={content} i={i}
                                assetsDirectory={assetsDirectory}
                                CTA={CTA}
                                language={language}
                            />
                        })
                    }
                    {children}
                </Container>
            </Wrapper>
        );
};

ListCardCustomContent.defaultProps = {}

export default ListCardCustomContent;