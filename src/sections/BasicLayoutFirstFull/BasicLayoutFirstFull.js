import React from 'react';
import {Wrapper, Container} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";


const BasicLayoutFirstFull = ({children, fields, name, assetsDirectory}) => {
    const Template = fields.Template;
    const FlexContainer = fields.FlexContainer;

    return (
        <Wrapper id={removeSpaces(name)}
                 asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                 assetsDirectory={assetsDirectory}
                 responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                 responsive={Template ? Template.responsiveSettings : []}
                 basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : {}}
        >
            <Container
                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                {children}
            </Container>
        </Wrapper>
    );
};

BasicLayoutFirstFull.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                basis: {
                    A: {
                        padding: {
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0'
                        },
                        color: {
                            hex: '#000000',
                            rgb: '0,0,0',
                            name: 'black',
                            shade: null
                        },
                        opacity: {
                            value: '1'
                        }
                    }
                }

            }
        },
        FlexContainer: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                flex: {
                    A: {
                        properties: {
                            columns: '1',
                            gutterHorizontal: '0',
                            gutterVertical: '0',
                            direction: 'row',
                            wrap: 'wrap',
                            justify: 'flex-start',
                            alignItems: 'flex-start',
                            alignContent: 'flex-start'
                        }
                    }
                }
            }


        }

    }
}

export default BasicLayoutFirstFull;
