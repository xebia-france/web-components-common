import React from 'react';
import { Wrapper } from './styled';
import PropTypes from 'prop-types';


const FullLayout = ({ children, fields }) => {
    const Template = fields.Template;

    return (
        <Wrapper responsive={Template ? Template.responsiveSettings : []}
                 colorElement={Template.settings ? Template.settings.color : ''}>
            {children}
        </Wrapper>
    );
};

FullLayout.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                color: {
                    A: {
                        hex: 'transparent',
                        name: 'transparent',
                        rgb: null,
                        shade: null
                    }
                },
                opacity: {
                    A: {
                        value: '1'
                    }
                }
            }
        }
    }
}

export default FullLayout;
