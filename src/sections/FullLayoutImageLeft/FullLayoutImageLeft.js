import React, {Component} from 'react';
import { Wrapper, Container, ImageBackground } from './styled';
import {getResponsiveKey, removeSpaces} from '../../utils/functions';
import PropTypes from 'prop-types';
import {ImageContainerCommon} from "../../styles/common.styled";

class FullLayoutImageLeft extends Component {

    getImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) {
                return null
            } else {
                return (
                    <ImageBackground
                        key={i}
                        responsive={field.responsiveSettings}
                        basis={field.settings.basis}
                        border={field.settings.border}
                        alt={image.alt[this.props.language]}
                        assetsDirectory={this.props.assetsDirectory}
                        asset={file}
                    />
                )
            }
        });
    }/*

    getImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) {
                return null
            } else {
                return (
                    <ImageContainerCommon key={i}
                                    responsive={field.responsiveSettings}
                                    basis={field.settings.basis}
                                    border={field.settings.border}>
                        <img alt={image.alt[this.props.language]} src={`${this.props.assetsDirectory || ''}${ file }`}/>
                    </ImageContainerCommon>);
            }
        });
    }*/
    render() {

        const { children, fields, name, assetsDirectory } = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;


        return (
            <Wrapper id={removeSpaces(name)} responsive={Template ? Template.responsiveSettings : null}
                     basis={Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template.settings && Template.settings.border ? Template.settings.border : null}
                     asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}

            >{
                fields.Image ? this.getImages(fields.Image) : null
            }
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    basis={Template.settings && Template.settings.basis ? Template.settings.basis : null}
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                    {children}
                </Container>
            </Wrapper>
        );
    }
};

FullLayoutImageLeft.defaultProps = {
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

export default FullLayoutImageLeft;
