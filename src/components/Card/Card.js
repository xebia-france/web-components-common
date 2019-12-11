import React, {Component} from 'react';
import {Container, Title, Content, ImageContainer, CTA} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

class Card extends Component {
    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {
            case 'Title':
                return <Title
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Title>;

            case 'Tagline':
                return <Title
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    as={fields[field].settings.seo.tag || 'h2'}
                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Title>;

            case 'Content':
                return <Content
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    basis={fields[field].settings.basis}
                    dangerouslySetInnerHTML={{
                        __html: fields[field].content.html ? fields[field].content.html[this.props.language] :
                            <p>no content</p>
                    }}
                />

            case 'Image':
                return this.getImages(fields[field]);

            case 'CTA':

                return <CTA
                    key={key}
                    responsive={fields[field].responsiveSettings}
                    basis={fields[field].settings.basis}
                    typography={fields[field].settings.typography}
                    border={fields[field].settings.border}
                    icon={fields[field].settings.icon}
                    href={fields[field].content.link ? fields[field].content.link[this.props.language] : ''}
                    target={fields[field].settings.target.external ? '_blank' : ''}
                >
                    {
                        fields[field].content.icon && fields[field].content.icon[this.props.language] ?
                            <i>{fields[field].content.icon[this.props.language]}</i>
                            : null
                    }
                    <p> {fields[field].content.text ? fields[field].content.text[this.props.language] : ''}</p>

                </CTA>;

            default :
                return null;
        }
    }


    getImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) {
                return null
            } else {
                return (
                    <ImageContainer key={i}
                                    responsive={field.responsiveSettings}
                                    basis={field.settings.basis}
                                    border={field.settings.border}>
                        <img alt={image.alt[this.props.language]} src={`${this.props.assetsDirectory || ''}${ file }`}/>
                    </ImageContainer>);
            }

        });
    }

    render() {
        const {fields, order, assetsDirectory} = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       responsiveContent={getResponsiveKey(Template.content.images[0].asset)}
                       asset={Template.content.images[0].asset}
                       assetsDirectory={assetsDirectory}
                       basis={Template && Template.settings ? Template.settings.basis : {}}>
                {
                    order ? order.map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                        : ['Title','Tagline', 'Content', 'Image', 'CTA'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}


Card.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                basis: {
                    A: {
                        size: {
                            width: '100',
                            height: '100',
                            maxWidth: '',
                            maxHeight: ''

                        },
                        padding: {
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0'
                        },
                        margin: {
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0'
                        },
                        alignment: {
                            horizontal: 'flex-start'
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
        Title: {
            content: {
                text: {
                    0: 'Salut',
                    1: 'Hello'
                }
            },
            responsiveSettings: ['A'],
            settings: {
                typography: {
                    M: {
                        font: {
                            theme: 'Title1',
                            family: null,
                            typeface: null,
                            weight: null,
                            style: null,
                            size: null,
                            lineHeight: null,
                            letterSpacing: '0'
                        },
                        text: {
                            align: 'center',
                            transform: null,
                            decoration: null
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
                    },
                    T: {
                        font: {
                            theme: 'Title2',
                            family: null,
                            typeface: null,
                            weight: null,
                            style: null,
                            size: null,
                            lineHeight: null,
                            letterSpacing: '0'
                        },
                        text: {
                            align: 'center',
                            transform: null,
                            decoration: null
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
                    },
                    D: {
                        font: {
                            theme: 'Title3',
                            family: null,
                            typeface: null,
                            weight: null,
                            style: null,
                            size: null,
                            lineHeight: null,
                            letterSpacing: '0'
                        },
                        text: {
                            align: 'center',
                            transform: null,
                            decoration: null
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
                },
                seo: {
                    tag: 'h2'
                }
            }
        }
    },
    language: 0
};

Card.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default Card;
