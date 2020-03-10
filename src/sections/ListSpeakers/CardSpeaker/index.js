import React, {Component} from 'react';
import {
    Below,
    Miniature,
    Contain,
    TextContent,
    Above,
    Portrait,
    Text,
    Card,
    Icon,
    IconContent
} from './styled';
import TextElement from '../TextElement'

class CardSpeaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightBelow: null,
        };
        this.below = React.createRef()
    }

    componentDidMount() {
        setTimeout(() => { this.getHeightCard(); }, 100);
    }

    getHeightCard = () => {
        if (this.below.current) {
            this.setState({heightBelow: this.below.current.clientHeight});
        }
    }

    getTalk(ref) {
        const {talks, fields} = this.props;
        const id = ref.split(" ")[0];
        const talk = talks.find(s => s.ID === Number(id));
        return (
            <Text
                responsive={fields['Speakers'].responsiveSettings}
                typography={fields['Speakers'].settings.text}
                basis={fields['Speakers'].settings.text}
            >
                {talk.Pitch}
            </Text>
        )
    }

    render() {
        const {s, i, fields, selected, talks, assetsDirectory} = this.props;
        const FlexContainer = fields.FlexContainer;
        const TemplateCard = fields.TemplateCard;

        return <Card
            basis={TemplateCard && TemplateCard.settings ? TemplateCard.settings.basis : {} }
            border={TemplateCard && TemplateCard.settings ? TemplateCard.settings.border : {} }
            photo={fields['Speakers'].settings.photo}
            onClick={(e) => {
                this.props.selectCard(i)
            }}
            heightBelow={this.state.heightBelow}
            responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
            className={selected ? 'selected' : ''}>
            <Contain>
                <Above>
                    <Portrait asset={s.Photo} assetsDirectory={assetsDirectory} >
                    </Portrait>
                    <TextContent>
                        <TextElement field={fields['Speakers']}
                                     property={'name'}
                                     content={`${s.FirstName || ''} ${s.LastName || ''}`}

                        />
                        <Text
                            responsive={fields['Speakers'].responsiveSettings}
                            typography={fields['Speakers'].settings.name}
                            basis={fields['Speakers'].settings.name}
                        >
                            {s.FirstName || ''} {s.LastName || ''}
                        </Text>
                        <Text
                            responsive={fields['Speakers'].responsiveSettings}
                            typography={fields['Speakers'].settings.job}
                            basis={fields['Speakers'].settings.job}
                        >
                            {s.Job || ''}
                        </Text>
                        <Text
                            responsive={fields['Speakers'].responsiveSettings}
                            typography={fields['Speakers'].settings.company}
                            basis={fields['Speakers'].settings.company}
                        >
                            {s.Company || ''}
                        </Text>
                    </TextContent>
                    <Miniature asset={s.Photo} assetsDirectory={assetsDirectory}/>
                </Above>
                <Below ref={this.below}>
                    { s.Bio && s.Bio !== '' ?
                        <TextContent>
                            <Text
                                responsive={fields['Speakers'].responsiveSettings}
                                typography={fields['Speakers'].settings.title}
                                basis={fields['Speakers'].settings.title}
                            >
                                Bio
                            </Text>
                            <Text
                                responsive={fields['Speakers'].responsiveSettings}
                                typography={fields['Speakers'].settings.text}
                                basis={fields['Speakers'].settings.text}
                            >
                                {s.Bio || ''}
                            </Text>
                        </TextContent>
                        : null
                    }

                    <TextContent>
                        {(s.Talk1 && s.Talk1 !== '') || (s.Talk2 && s.Talk2 !== '') ?
                            <Text
                                responsive={fields['Speakers'].responsiveSettings}
                                typography={fields['Speakers'].settings.title}
                                basis={fields['Speakers'].settings.title}
                            >
                                Talk
                            </Text>
                            : null
                        }
                        {
                            s.Talk1 && s.Talk1 !== '' ?
                                this.getTalk(s.Talk1)
                                : null
                        }
                        {
                            s.Talk2 && s.Talk2 !== '' ?
                                this.getTalk(s.Talk2)
                                : null
                        }
                    </TextContent>
                    <IconContent>
                        {s.Twitter && s.Twitter !== '' ?
                            <Icon
                                responsive={fields['Speakers'].responsiveSettings}
                                icon={fields['Speakers'].settings.icon}
                                target={'_blank'}
                                href={`https://twitter.com/${s.Twitter}`}
                            >
                                <i>{fields['Speakers'].content.icon1}</i>
                            </Icon>

                            : null}
                        {s.Linkedin && s.Linkedin !== '' ?
                            <Icon
                                responsive={fields['Speakers'].responsiveSettings}
                                icon={fields['Speakers'].settings.icon}
                                target={'_blank'}
                                href={`https://www.linkedin.com/in/${s.Linkedin}`}
                            >
                                <i>{fields['Speakers'].content.icon2}</i>
                            </Icon>

                            : null}
                        {s.Github && s.Github !== '' ?
                            <Icon
                                responsive={fields['Speakers'].responsiveSettings}
                                icon={fields['Speakers'].settings.icon}
                                target={'_blank'}
                                href={`https://github.com/${s.Github}`}
                            >
                                <i>{fields['Speakers'].content.icon3}</i>
                            </Icon>

                            : null}
                    </IconContent>
                </Below>
            </Contain>
        </Card>;
    }
}

CardSpeaker.propTypes = {};

export default CardSpeaker;
