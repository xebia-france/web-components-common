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
                    color={fields[field].settings.color}
                    font={fields[field].settings.font}
                    text={fields[field].settings.text}
                    opacity={fields[field].settings.opacity}
                    as={fields[field].settings.seo.tag || 'h2'}

                >
                    {fields[field].content.text ? fields[field].content.text[this.props.language] : 'no text'}
                </Title>;

            case 'Content':
                return <Content
                    responsive={fields[field].responsiveSettings}
                    color={fields[field].settings.color}
                    font={fields[field].settings.font}
                    text={fields[field].settings.text}
                    opacity={fields[field].settings.opacity}
                    dangerouslySetInnerHTML={{__html: fields[field].content.html ? fields[field].content.html[this.props.language] : <p>no content</p>}}
                />

            default :
                return null;
        }
    }

    render() {
        const {fields} = this.props;

        console.log('fields on blocktext', fields);


        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       color={Template && Template.settings ? Template.settings.color : ''}>
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
                color: {
                    A: {
                        hex: null,
                        name: null,
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
                color: {
                    A: {
                        hex: '#456677',
                        name: 'Bleu',
                        rgb: '69,102,119',
                        shade: 'L'
                    }
                },
                font: {
                    A: {
                        family: 'Arial',
                        letterSpacing: '0',
                        lineHeight: '80',
                        size: '70',
                        style: null,
                        theme: 'Title1',
                        typeface: 'sans-serif',
                        weight: ['Regular', 400]
                    }
                },
                text: {
                    A: {
                        align: 'center',
                        decoration: null,
                        transform: null
                    }
                },
                opacity: {
                    A: {
                        value: '0.95'
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

BlockText.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default BlockText;
