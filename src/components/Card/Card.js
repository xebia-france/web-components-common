import React, {Component} from 'react';
import {Container, Title, Content, ImageContainer, CTA} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

class Card extends Component {
    buildComponent = (fields, field) => {
        console.log('fields', fields);
        if (!fields[field]) return
        switch (field) {
            case 'Title':
                return <Title
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    as={fields[field].settings.seo.tag || 'h2'}

                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Title>;

            case 'Content':
                return <Content
                    responsive={fields[field].responsiveSettings}
                    typography={fields[field].settings.typography}
                    dangerouslySetInnerHTML={{__html: fields[field].content.html ? fields[field].content.html[this.props.language] : <p>no content</p>}}
                />

            case 'Image':
                return this.getImages(fields[field]);

            case 'CTA':
                return <CTA
                    responsive={fields[field].responsiveSettings}
                    basis={fields[field].settings.basis}
                    typography={fields[field].settings.typography}
                    border={fields[field].settings.border}
                    icon={fields[field].settings.icon}
                    href={fields[field].content.link ? fields[field].content.link[this.props.language] : ''}
                    target={fields[field].settings.target.external ? '_blank' : ''}
                >
                    <i>{fields[field].content.icon ? fields[field].content.icon[this.props.language] : ''}</i>
                    <p> {fields[field].content.text ? fields[field].content.text[this.props.language] : ''}</p>
                </CTA>;

            default :
                return null;
        }
    }


    getImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {

            const file = image.asset[responsiveContent].fields ? image.asset[responsiveContent].fields.file : null;
            console.log('file', file);
            if (!file) return <ImageContainer key={i} responsive={field.responsiveSettings} basis={field.settings.basis}/>;

            return (
                <ImageContainer key={i}
                                responsive={field.responsiveSettings}
                                basis={field.settings.basis}
                                border={field.settings.border}>
                    <img alt={image.alt[this.props.language]} src={`https:${ file[Object.keys(file)[0]].url }`}/>
                </ImageContainer>);
        });
    }

    render() {
        const {fields, order} = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       basis={Template && Template.settings ? Template.settings.basis : {}}>
                {
                    order  ? order.map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                        :['Title', 'Content', 'Image', 'CTA'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
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
