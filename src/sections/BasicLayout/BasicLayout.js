import React from 'react';
import { Wrapper, Container } from './styled';
import PropTypes from 'prop-types';


const BasicLayout = ({ children, fields }) => {
    const Template = fields.Template;

    return (
        <Wrapper responsive={Template ? Template.responsiveSettings : []}
                 color={Template.settings && Template.settings.color ? Template.settings.color : ''}>
            <Container>
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
                }
            }
        }
    }
}

export default BasicLayout;
