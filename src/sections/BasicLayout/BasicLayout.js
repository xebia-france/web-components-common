import React from 'react';
import {Wrapper, Container} from './styled';

const BasicLayout = ({children, fields}) => {
    const Template = fields.Template;
    const FlexContainer = fields.FlexContainer;

    return (
        <Wrapper responsive={Template ? Template.responsiveSettings : []}
                 basis={Template.settings && Template.settings.basis ? Template.settings.basis : {}}
        >
            <Container
                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                flex={FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                {children}
            </Container>
        </Wrapper>
    );
};

BasicLayout.defaultProps = {
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

export default BasicLayout;
