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
import {fileNameFromUrl} from "../../../utils/functions";


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
        const {speaker, i, selected, assetsDirectory, configSpeakers, configCard} = this.props;

        const Settings = configCard && configCard.settings ? configCard.settings : null;
        const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];
        if(!speaker) return null
        console.log('speaker.imageURL', speaker.imageURL)
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
                    <Portrait asset={fileNameFromUrl(speaker.imageURL)} assetsDirectory={assetsDirectory}>
                    </Portrait>
                    <TextContent>
                        <TextElement field={configSpeakers} property={'name'}
                                     content={`${speaker.firstName || ''} ${speaker.lastName || ''}`}/>
                        <TextElement field={configSpeakers} property={'job'} content={speaker.job || ''}/>
                        <TextElement field={configSpeakers} property={'company'} content={speaker.company || ''}/>
                    </TextContent>
                    <Miniature asset={speaker.imageURL} assetsDirectory={assetsDirectory}/>
                </Above>
                <Below ref={this.below}>
                    {speaker.bio && speaker.bio !== '' ?
                        <TextContent>
                            <TextElement field={configSpeakers} property={'title'} content={'Bio'}/>
                            <TextElement field={configSpeakers} property={'text'} content={speaker.bio || ''}/>
                        </TextContent>
                        : null
                    }

                    {speaker.talks.length !== 0 ?
                        <TextContent>
                            <TextElement field={configSpeakers} property={'title'} content={'Talk'}/>
                            {speaker.talks.map((talk, i) => <TextElement key={i} field={configSpeakers} property={'text'}
                                                                 content={talk.title}/>)}
                        </TextContent>
                        : null
                    }
                    {
                        speaker.tweetHandle || speaker.Linkedin || speaker.Github ?

                            <IconContent>
                                {speaker.tweetHandle && speaker.tweetHandle !== '' ?
                                    <IconElement field={configSpeakers} property={'icon'}
                                                 content={configSpeakers.content.icon1}
                                                 link={`https://twitter.com/${speaker.tweetHandle}`}

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
                            </IconContent> : null
                    }
                </Below>
            </Contain>
        </Card>;
    }
}

CardSpeaker.propTypes = {};

export default CardSpeaker;
