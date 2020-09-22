import React from 'react';
import {Wrapper, Container, ImageCorner, WrapperTwin, ParallaxWrapper} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import {useWindowSize} from '../../utils/customHooks';

const buildComponent = (fields, field, index, assetsDirectory) => {
    if (!fields[field]) return
    switch (field) {
        case 'CornerImages' :
            return getCornerImages(fields[field], assetsDirectory);

        default :
            return null;
    }
}

const getCornerImages = (field, assetsDirectory) => {
    const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
    return field.content.images.map((image, i) => {

        const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
        if (!file) return <ImageCorner key={i}
                                       responsive={getResponsiveKey(field.settings.basis)}
                                       basis={field.settings.basis}
                                       index={i + 1}
                                       responsiveContent={getResponsiveKey(field.content.images[0].asset)}
                                       assetsDirectory={assetsDirectory}/>;

        return (
            <ImageCorner key={i}
                         responsive={getResponsiveKey(field.settings.basis)}
                         basis={field.settings.basis}
                         responsiveContent={getResponsiveKey(field.content.images[0].asset)}
                         assetsDirectory={assetsDirectory}
                         asset={image.asset ? image.asset : null}
                         index={i + 1}>
            </ImageCorner>);
    });
}

const LayoutFixedBkgCornersImg = ({children, fields, name, assetsDirectory}) => {
        const size = useWindowSize();
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;
        return (<>
                <Wrapper id={removeSpaces(name)}
                         asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                         assetsDirectory={assetsDirectory}
                         responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                         responsive={Template ? Template.responsiveSettings : null}
                         basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                         border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
                >

                        <ParallaxWrapper/>
                        {['CornerImages'].map((fieldName, i) => buildComponent(fields, fieldName, i, assetsDirectory))}
                    {
                        size.width > 767 &&
                        (<Container
                            responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                            flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>

                            {children}
                        </Container>)
                    }
                </Wrapper>
                {
                    size.width <= 767 &&
                    (<WrapperTwin
                        asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                        assetsDirectory={assetsDirectory}
                        responsiveContent={[]}
                        responsive={Template ? Template.responsiveSettings : null}
                        basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                        border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}>
                        <ParallaxWrapper/>
                        <Container
                            responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                            flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                            {children}
                        </Container>
                    </WrapperTwin>)
                }
            </>
        );
    }
;

LayoutFixedBkgCornersImg.defaultProps = {
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

export default LayoutFixedBkgCornersImg;
