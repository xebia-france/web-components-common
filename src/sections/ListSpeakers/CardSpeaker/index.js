import React, {Component} from 'react';
import {
    Below,
    Miniature,
    Contain,
    TextContent,
    Above,
    Portrait,
    Card,
    IconContent
} from './styled';
import TextElement from '../TextElement'
import IconElement from '../IconElement'

class CardSpeaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightBelow: null,
        };
        this.below = React.createRef()
    }

    componentDidMount() {
        setTimeout(() => {
            this.getHeightCard();
        }, 100);
    }

    getHeightCard = () => {
        if (this.below.current) {
            this.setState({heightBelow: this.below.current.clientHeight});
        }
    }

    render() {
        const {speaker, i, selected, talks, assetsDirectory, configSpeakers, configCard} = this.props;

        const Settings = configCard && configCard.settings ? configCard.settings : null;
        const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];

        return <Card
            responsive={Responsive}
            basis={Settings ? Settings.basis : {}}
            border={Settings ? Settings.border : {}}
            photo={configSpeakers.settings.photo}
            onClick={() => {
                this.props.selectCard(i)
            }}
            heightBelow={this.state.heightBelow}
            className={selected ? 'selected' : ''}>
            <Contain>
                <Above>
                    <Portrait asset={speaker.Photo} assetsDirectory={assetsDirectory}>
                    </Portrait>
                    <TextContent>
                        <TextElement field={configSpeakers} property={'name'}
                                     content={`${speaker.FirstName || ''} ${speaker.LastName || ''}`}/>
                        <TextElement field={configSpeakers} property={'job'} content={speaker.Job || ''}/>
                        <TextElement field={configSpeakers} property={'company'} content={speaker.Company || ''}/>
                    </TextContent>
                    <Miniature asset={speaker.Photo} assetsDirectory={assetsDirectory}/>
                </Above>
                <Below ref={this.below}>
                    {speaker.Bio && speaker.Bio !== '' ?
                        <TextContent>
                            <TextElement field={configSpeakers} property={'title'} content={'Bio'}/>
                            <TextElement field={configSpeakers} property={'text'} content={speaker.Bio || ''}/>
                        </TextContent>
                        : null
                    }

                    {talks.length !== 0 ?
                        <TextContent>
                            <TextElement field={configSpeakers} property={'title'} content={'Talk'}/>
                            {talks.map((talk, i) => <TextElement key={i} field={configSpeakers} property={'text'}
                                                            content={talk.Pitch}/>)}
                        </TextContent>
                        : null
                    }
                    <IconContent>
                        {speaker.Twitter && speaker.Twitter !== '' ?
                            <IconElement field={configSpeakers} property={'icon'}
                                         content={configSpeakers.content.icon1}
                                         link={`https://twitter.com/${speaker.Twitter}`}

                            />
                            : null}
                        {speaker.Linkedin && speaker.Linkedin !== '' ?
                            <IconElement field={configSpeakers} property={'icon'}
                                         content={configSpeakers.content.icon2}
                                         link={`https://www.linkedin.com/in/${speaker.Linkedin}`}

                            />
                            : null}
                        {speaker.Github && speaker.Github !== '' ?
                            <IconElement field={configSpeakers} property={'icon'}
                                         content={configSpeakers.content.icon3}
                                         link={`https://github.com/${speaker.Github}`}

                            />
                            : null}
                    </IconContent>
                </Below>
            </Contain>
        </Card>;
    }
}

CardSpeaker.propTypes = {};

export default CardSpeaker;
