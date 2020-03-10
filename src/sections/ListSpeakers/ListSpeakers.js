import React, {Component} from 'react';
import {
    Wrapper,
    Container
} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import CardSpeaker from './CardSpeaker';

class ListSpeakers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            selectedCard: null,
        };
    }

    componentDidMount() {
        console.log('PROPS SPEAKERS', this.props.speakers);
        console.log('SETTINGS SPEAKER', this.props.fields['Speakers'].settings);
        console.log('CONTENT SPEAKER', this.props.fields['Speakers'].content);
        console.log('PROPS TALKS', this.props.talks);
    }

    selectCard = (i) => {
        if (this.state.selectedCard === i) {
            this.setState({active: false, selectedCard: null})
        } else if (this.state.selectedCard !== null) {
            this.setState({
                active: false, selectedCard: null
            }, () => {
                var x = setTimeout(() => {
                    this.setState({active: true, selectedCard: i}, () => {
                        clearTimeout(x);
                    })
                }, 500);
            })
        } else {
            this.setState({active: true, selectedCard: i})
        }
    }

    render() {
        const {children, fields, name, assetsDirectory, speakers, talks} = this.props;
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
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}
                    className={this.state.active ? 'active' : ''}
                >
                    {
                        speakers.map((s, i) => {
                            return <CardSpeaker selectCard={this.selectCard} s={s} i={i} fields={fields} talks={talks}
                                                selected={i === this.state.selectedCard} assetsDirectory={assetsDirectory}/>
                        })
                    }
                    { children }
                </Container>
            </Wrapper>
        );
    }
};

ListSpeakers.defaultProps = {
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

export default ListSpeakers;