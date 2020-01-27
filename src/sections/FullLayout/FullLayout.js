import React from 'react';
import { Wrapper } from './styled';
import {getResponsiveKey, removeSpaces} from '../../utils/functions';
import PropTypes from 'prop-types';


const FullLayout = ({ children, fields, name, assetsDirectory }) => {
    const Template = fields.Template;

    return (
        <Wrapper id={removeSpaces(name)} responsive={Template ? Template.responsiveSettings : null}
                 basis={Template.settings && Template.settings.basis ? Template.settings.basis : null}
                 border={Template.settings && Template.settings.border ? Template.settings.border : null}
                 asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                 assetsDirectory={assetsDirectory}
                 responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}

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
