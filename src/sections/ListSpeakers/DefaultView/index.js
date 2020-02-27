import React, {Component} from 'react';

import { Container, Below, Miniature, Contain, TextContent, Above, Portrait, Text, Card, Icon, IconContent } from './styled';

class DefaultView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            selectedCard: null,
            widthCard: null
        };

        this.myInput = React.createRef()

    }

    componentDidMount() {
        this.getWidthCard();

        window.addEventListener('resize', () => {
            this.getWidthCard();
        })
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

    getWidthCard = () =>  {
        if(this.myInput.current){
            this.setState({widthCard: this.myInput.current.offsetWidth});
        }
    }

    render() {
        const {  fields, speakers, talks, assetsDirectory } = this.props;
        const FlexContainer = fields.FlexContainer;

        return (
            <Container
                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}
                className={this.state.active ? 'active' : ''}
            >
                {
                    speakers.map((s, i) => {
                        return <Card
                            ref={i === 0 ? this.myInput : null}
                            responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                            flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}
                            className={i === this.state.selectedCard ? 'selected' : ''}

                            onClick={() => {
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
                            }}>
                            <Contain>
                                <Above>
                                    <Portrait asset={s.Photo} assetsDirectory={assetsDirectory}>
                                        <Miniature asset={s.Photo} assetsDirectory={assetsDirectory}/>
                                    </Portrait>
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

                                </Above>
                                <Below elementWidth={this.state.widthCard}>
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
                        </Card>
                    })
                }
            </Container>
        );
    }
}

DefaultView.propTypes = {};

export default DefaultView;
