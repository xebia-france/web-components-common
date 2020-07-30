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

    componentDidMount(){
        console.log('PROPS ON LISTSPEAKERS', this.props)
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
        const {children, fields, name, assetsDirectory, data} = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;

        const AssetBackground = Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null;
        const Settings = Template && Template.settings ? Template.settings : null;

        console.log('PROPS ON LISTSPEAKERS', this.props)
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
                        data.map((speaker, i) => {
                            return <CardSpeaker
                                key={i}
                                configSpeakers={fields.Speakers}
                                configCard={fields.TemplateCard}
                                selectCard={this.selectCard} speaker={speaker} i={i}
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