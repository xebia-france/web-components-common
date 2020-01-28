import React, { Component } from 'react';
import {Wrapper, Container, ImageCorner} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";


class BasicLayoutCornersImages extends Component{// = ({children, fields, name, assetsDirectory}) => {
    buildComponent = (fields, field) => {
        if (!fields[field]) return
        switch (field) {
            case 'CornerImages' :
                return this.getCornerImages(fields[field]);

            default :
                return null;
        }
    }

    getCornerImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) return <ImageCorner key={i} responsive={field.responsiveSettings} basis={field.settings.basis} index={i+1}/>;

            return (
                <ImageCorner key={i} responsive={field.responsiveSettings} basis={field.settings.basis} index={i+1}>
                    <img alt={image.alt[this.props.language]} src={`${this.props.assetsDirectory || ''}${ file }`}/>
                </ImageCorner>);
        });
    }

    render() {
        const {children, fields, name, assetsDirectory} = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;


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
                        ['CornerImages'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                    }
                    {children}
                </Container>
            </Wrapper>
        );
    }
};

BasicLayoutCornersImages.defaultProps = {
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

export default BasicLayoutCornersImages;
