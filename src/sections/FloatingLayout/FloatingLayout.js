import React, {useRef, useEffect, useState} from 'react';
import {Wrapper, Container} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import { useWindowScroll} from "../../utils/customHooks";

const FloatingLayout = ({children, fields, name, assetsDirectory, language}) => {
    const Template = fields.Template;
    const FlexContainer = fields.FlexContainer;

    const ref = useRef(null);
    const [elementY, setElementY] = useState(undefined);

    useEffect(() => {
        function handleScroll() {
            setElementY(ref.current.getBoundingClientRect().top)
        }
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (<div  ref={ref}>
            <Wrapper id={removeSpaces(name)}

                     appear={elementY <= 0}
                     asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                     responsive={Template ? Template.responsiveSettings : null}
                     basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            >
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>

                    {children}
                </Container>
            </Wrapper>
        </div>
    );
};

FloatingLayout.defaultProps = {
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

export default FloatingLayout;
