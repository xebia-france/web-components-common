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

    getTalks(speaker) {
        const {talks} = this.props;

        return ['Talk1', 'Talk2']
            .map(field => {
                if (speaker[field] && speaker[field] !== '') {
                    const id = Number(speaker[field].split(" ")[0]);
                    return talks.find(talk => talk.ID === id)
                }
            })
            .filter(el => el)
    }

    render() {
        const {children, fields, name, assetsDirectory, speakers} = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;

        const AssetBackground = Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null;
        const Settings = Template && Template.settings ? Template.settings : null;


        return (
            <Wrapper id={removeSpaces(name)}
                     asset={AssetBackground}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={AssetBackground ? getResponsiveKey(AssetBackground) : null}
                     responsive={Template ? Template.responsiveSettings : null}
                     basis={Settings && Settings.basis ? Settings.basis : null}
                     border={Settings && Settings.border ? Settings.border : null}
            >
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}
                    className={this.state.active ? 'active' : ''}
                >
                    {
                        speakers.map((speaker, i) => {
                            return <CardSpeaker
                                key={i}
                                configSpeakers={fields.Speakers}
                                configCard={fields.TemplateCard}
                                selectCard={this.selectCard} speaker={speaker} i={i} talks={this.getTalks(speaker)}
                                selected={i === this.state.selectedCard} assetsDirectory={assetsDirectory}/>
                        })
                    }
                    {children}
                </Container>
            </Wrapper>
        );
    }
};

ListSpeakers.defaultProps = {}

export default ListSpeakers;