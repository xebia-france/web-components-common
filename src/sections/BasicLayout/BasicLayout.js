import React from 'react';
import {Wrapper, Container} from './styled';
import PropTypes from 'prop-types';


const BasicLayout = ({children, fields}) => {
    const Template = fields.Template;
    const FlexContainer = fields.FlexContainer;

    console.log('settings opacity', Template.settings.opacity);
    console.log('settings color', Template.settings.color);
    return (
        <Wrapper responsive={Template ? Template.responsiveSettings : []}
                 paddingElement={Template.settings && Template.settings.padding ? Template.settings.padding : {}}
                 colorElement={Template.settings && Template.settings.color ? Template.settings.color : {}}
                 opacityElement={Template.settings && Template.settings.opacity ? Template.settings.opacity : {}}>
            <Container
                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                flex={FlexContainer.settings ? FlexContainer.settings.flex : {} }>
                {children}
            </Container>
        </Wrapper>
    );
};

BasicLayout.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['M', 'T', 'D'],
            settings: {
                color: {
                    M: {
                        hex: 'transparent',
                        name: 'Transparent',
                        rgb: null,
                        shade: null
                    },
                    T: {
                        hex: 'transparent',
                        name: 'Transparent',
                        rgb: null,
                        shade: null
                    },
                    D: {
                        hex: 'transparent',
                        name: 'Transparent',
                        rgb: null,
                        shade: null
                    }
                },
                opacity: {
                    M: {
                        value: '1'
                    },
                    T: {
                        value: '1'
                    },
                    D: {
                        value: '1'
                    }
                },
                padding: {
                    M: {
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0'
                    },
                    T: {
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0'
                    },
                    D: {
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0'
                    }
                }

            }
        },
        FlexContainer: {
            content: {},
            responsiveSettings: ['M', 'T', 'D'],
            settings: {
                flex: {
                    M: {
                        columns : '1',
                        gutterHorizontal : '0',
                        gutterVertical : '0',
                        direction: 'row',
                        wrap: 'wrap',
                        justify: 'flex-start',
                        alignItems: 'flex-start',
                        alignContent: 'flex-start'
                    },
                    T: {
                        columns : '1',
                        gutterHorizontal : '0',
                        gutterVertical : '0',
                        direction: 'row',
                        wrap: 'wrap',
                        justify: 'flex-start',
                        alignItems: 'flex-start',
                        alignContent: 'flex-start'
                    },
                    D: {
                        columns : '1',
                        gutterHorizontal : '0',
                        gutterVertical : '0',
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

export default BasicLayout;
