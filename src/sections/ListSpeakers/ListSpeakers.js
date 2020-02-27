import React, {Component} from 'react';
import {
    Wrapper,
    Container,
    Card,
    Portrait,
    Image,
    Text,
    Miniature,
    Banner,
    Below,
    Above,
    TextContent,
    IconContent,
    Icon,
    Contain


} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import {device} from '../../styles/constants';
import MobileView from './MobileView';
import DefaultView from './DefaultView';

class ListSpeakers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderedSpeakers: [],
            view : <DefaultView fields={props.fields} speakers={props.speakers} talks={props.talks}
                                assetsDirectory={props.assetsDirectory}/>
        };
    }

    componentDidMount() {
        console.log('PROPS SPEAKERS', this.props.speakers);
        console.log('SETTINGS SPEAKER', this.props.fields['Speakers'].settings);
        console.log('CONTENT SPEAKER', this.props.fields['Speakers'].content);
        console.log('PROPS TALKS', this.props.talks);


        this.orderSpeakers();
        this.getMediaQueryView();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', () => {
                this.getMediaQueryView();
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.orderedSpeakers !== prevState.orderedSpeakers ){
            this.getMediaQueryView();
        }
    }

    getMediaQueryView = () => {
        const { fields, talks, assetsDirectory} = this.props
        if(typeof window !== 'undefined'  && window.matchMedia(device.M).matches){
            this.setState({
                view : <MobileView fields={fields} speakers={this.state.orderedSpeakers} talks={talks}
                                   assetsDirectory={assetsDirectory}/>
            })
        }else{
            this.setState({
                view :  <DefaultView fields={fields} speakers={this.state.orderedSpeakers} talks={talks}
                                assetsDirectory={assetsDirectory}/>
            })
        }
    }

    orderSpeakers = () => {
        const {fields, speakers} = this.props;
        let orderedSpeakers = [];
        fields.Speakers.content.speakers.map(id => {
            orderedSpeakers.push(speakers.find(s => s.ID === id));
        })
        this.setState({
            orderedSpeakers: orderedSpeakers
        })
    }

    render() {
        const {children, fields, name, assetsDirectory, speakers, talks} = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;


        if(this.state.orderedSpeakers.length  === 0) return null
        return (
            <Wrapper id={removeSpaces(name)}
                     asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                     responsive={Template ? Template.responsiveSettings : null}
                     basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            >
                {
                    this.state.view
                }
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


/*

<Content>
    <Portrait asset={s.Photo} assetsDirectory={assetsDirectory}>
        <Image asset={s.Photo} assetsDirectory={assetsDirectory}/>
        <Banner>
            <Miniature asset={s.Photo} assetsDirectory={assetsDirectory}/>
            <div>
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
            </div>
        </Banner>
    </Portrait>

    <Information>
        <Main>
            <BasicInfo>
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
            </BasicInfo>
        </Main>
        <Second>
            <SecondaryInfo>
                <Text
                    responsive={fields['Speakers'].responsiveSettings}
                    typography={fields['Speakers'].settings.text}
                >
                    {s.Bio || ''}
                </Text>
            </SecondaryInfo>
        </Second>

    </Information>
</Content>







 */


/*

<Container
    nbrSlides={speakers.length}
    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}
    className={this.state.active ? 'active' : ''}
>
    {
        speakers.map((s, i) => {
            console.log('S ---->', s)
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




 */