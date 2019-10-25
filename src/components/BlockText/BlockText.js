import React, {Component} from 'react';
import {Container, Title, Content} from './styled';
import PropTypes from 'prop-types';

class BlockText extends Component {
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

            default :
                return null;
        }
    }

    render() {
        const {fields} = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       basis={Template && Template.settings ? Template.settings.basis : {}}
                       >
                {
                    ['Title', 'Content'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}


BlockText.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                basis: {
                    A: {
                        size: {
                            width: '',
                            height: '',
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
                    A: {
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
                    }
                },
                seo: {
                    tag: 'h2'
                }
            }
        },
        Content: {
            content: {
                html: {
                    0: '',
                    1: ''
                }
            },
            responsiveSettings: ['A'],
            settings: {
                typography: {
                    A: {
                        font: {
                            theme: 'Paragraph',
                            family: null,
                            typeface: null,
                            weight: null,
                            style: null,
                            size: null,
                            lineHeight: null,
                            letterSpacing: '0'
                        },
                        text: {
                            align: 'left',
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
                }

            }
        }
    },
    language: 0
};

BlockText.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default BlockText;
