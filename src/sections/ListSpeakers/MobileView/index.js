import React, {Component} from 'react';

import {
    Container,
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

class MobileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            selectedCard: null,
            widthCard: null
        };
    }

    componentDidMount() {

    }

    selectCard = (i) => {
       
        if (this.state.selectedCard === i) {
            this.setState(prevState => ({
                active: false,//!prevState.active,
                selectedCard: null
            }))
        } else if (this.state.selectedCard !== null) {
            this.setState(prevState => ({
                active: false,//!prevState.active,
                selectedCard: null
            }), () => {
                var x = setTimeout(() => {
                    this.setState(prevState => ({
                        active: true,
                        selectedCard: i
                    }), () => {
                        clearTimeout(x);
                    })
                }, 400);
            })
        } else {
            this.setState(prevState => ({
                active: true,
                selectedCard: i
            }))
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
            >
                {talk.Pitch}
            </Text>
        )
    }


    render() {
        const {fields, speakers, talks, assetsDirectory} = this.props;

        const FlexContainer = fields.FlexContainer;

        return (
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
            </Container>
        );
    }
}


class CardSpeaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightAbove : null,
            heightBelow : null
        };
        this.above = React.createRef()
        this.below = React.createRef()

    }
    componentDidMount() {
        var x = setTimeout(() => {
            this.getHeightCard();
        }, 200);

        window.addEventListener('resize', () => {
            this.getHeightCard();
        })
    }

    getHeightCard = () =>  {
        if(this.above.current){
            this.setState({heightAbove: this.above.current.offsetHeight});
        }
        if(this.below.current){
            this.setState({heightBelow: this.below.current.offsetHeight});
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
            >
                {talk.Pitch}
            </Text>
        )
    }

    render() {
        const {s, i, fields, selected, talks, assetsDirectory} = this.props;
        const FlexContainer = fields.FlexContainer;

        return <Card
            heightAbove={this.state.heightAbove}
            heightBelow={this.state.heightBelow}
            onClick={ () => this.props.selectCard(i)}
            responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
            flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}
            className={selected ? 'selected' : ''}>
            <Contain>
                <Above ref={this.above}>
                    <Portrait asset={s.Photo} assetsDirectory={assetsDirectory}>
                        <TextContent>
                            <Text
                                responsive={fields['Speakers'].responsiveSettings}
                                typography={fields['Speakers'].settings.name}
                            >
                                {s.FirstName || ''} {s.LastName || ''}
                            </Text>
                            <Text
                                responsive={fields['Speakers'].responsiveSettings}
                                typography={fields['Speakers'].settings.job}
                            >
                                {s.Job || ''}
                            </Text>
                            <Text
                                responsive={fields['Speakers'].responsiveSettings}
                                typography={fields['Speakers'].settings.company}
                            >
                                {s.Company || ''}
                            </Text>
                        </TextContent>
                    </Portrait>

                </Above>
                <Below ref={this.below}>
                    <Miniature asset={s.Photo} assetsDirectory={assetsDirectory}/>
                    <TextContent>
                        <Text
                            responsive={fields['Speakers'].responsiveSettings}
                            typography={fields['Speakers'].settings.title}
                        >
                            Bio
                        </Text>
                        <Text
                            responsive={fields['Speakers'].responsiveSettings}
                            typography={fields['Speakers'].settings.text}
                        >
                            {s.Bio || ''}
                        </Text>
                    </TextContent>
                    <TextContent>
                        {(s.Talk1 && s.Talk1 !== '') || (s.Talk2 && s.Talk2 !== '') ?
                            <Text
                                responsive={fields['Speakers'].responsiveSettings}
                                typography={fields['Speakers'].settings.title}
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

MobileView.propTypes = {};

export default MobileView;
