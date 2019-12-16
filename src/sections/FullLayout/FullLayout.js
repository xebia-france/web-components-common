import React from 'react';
import { Wrapper } from './styled';
import { removeSpaces } from '../../utils/functions';
import PropTypes from 'prop-types';


const FullLayout = ({ children, fields, name }) => {
    const Template = fields.Template;

    return (
        <Wrapper id={removeSpaces(name)} responsive={Template ? Template.responsiveSettings : []}
                 basis={Template.settings ? Template.settings.basis : {}}
        >
            {children}
        </Wrapper>
    );
};

FullLayout.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['M', 'T', 'D'],
            settings: {
                basis: {
                    M: {
                        color: {
                            hex: '#000000',
                            rgb: '0,0,0',
                            name: 'black',
                            shade: null
                        },
                        opacity: {
                            value: '1'
                        }
                    },
                    T: {
                        color: {
                            hex: '#000000',
                            rgb: '0,0,0',
                            name: 'black',
                            shade: null
                        },
                        opacity: {
                            value: '1'
                        }
                    },
                    D: {
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
        }
    }
}

export default FullLayout;
