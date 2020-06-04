import React, {Component} from 'react';
import {
    Wrapper,
    Container,
    Inner,
    Card,
    TextWithView,
    BlockCenter,
    BlockCenterColumn,
    BlockText,
    Front,
    Back,
    ImageContainer, Icon
} from './styled';
import PropTypes from 'prop-types';
import { removeSpaces } from '../../utils/functions';
import {generatePictureWebP} from "../../utils/gettersCommonElement";

class ListSpeakersFlipCard extends Component {

    render() {
        const {fields, data, assetsDirectory, children, name} = this.props;

        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;
        const TemplateCard = fields.TemplateCard;
        const Speakers = fields.Speakers;

        return (
            <Wrapper id={removeSpaces(name) } responsive={Template ? Template.responsiveSettings : []}
                     basis={Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template.settings && Template.settings.border ? Template.settings.border : null}
            >
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    flex={FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                    {
                        data ?
                            Object.keys(data).map(i => {
                                return <Card responsive={TemplateCard ? TemplateCard.responsiveSettings : []}

                                             basis={TemplateCard.settings && TemplateCard.settings.basis ? TemplateCard.settings.basis : {}}

                                >
                                    <Inner>
                                        <Front responsive={TemplateCard ? TemplateCard.responsiveSettings : []}
                                               image={data[i].photo !== '' ? getImagePath(data[i].photo, assetsDirectory) : null}
                                               basis={TemplateCard.settings && TemplateCard.settings.basis ? TemplateCard.settings.basis : {}}
                                        >
                                            <div>
                                                <BlockCenter>
                                                    {data[i].firstname !== '' && Speakers.content.display.view1.firstname ?
                                                        <TextWithView view={'view1'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.firstname}>{data[i].firstname} &nbsp;</TextWithView>
                                                        : null}
                                                    {data[i].lastname !== '' && Speakers.content.display.view1.lastname ?
                                                        <TextWithView view={'view1'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.lastname}> {data[i].lastname}</TextWithView>
                                                        : null}
                                                </BlockCenter>

                                                <BlockCenterColumn>
                                                    {data[i].position !== '' && Speakers.content.display.view1.position ?
                                                        <TextWithView view={'view1'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.position}>{data[i].position}</TextWithView>
                                                        : null}
                                                    {data[i].company !== '' && Speakers.content.display.view1.company ?
                                                        <TextWithView view={'view1'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.company}> {data[i].company}</TextWithView>
                                                        : null}
                                                </BlockCenterColumn>
                                                {
                                                    data[i].companyLogo !== '' && Speakers.content.display.view1.companyLogo ?
                                                        <BlockCenter>
                                                            <ImageContainer
                                                                responsive={Speakers.responsiveSettings}
                                                                basis={Speakers.settings.companyLogo}
                                                                view={'view1'}
                                                            >
                                                                {
                                                                    generatePictureWebP(getImagePath(data[i].companyLogo, assetsDirectory), 'image')
                                                                }
                                                            </ImageContainer>

                                                        </BlockCenter> : null
                                                }
                                                <BlockCenter>
                                                {
                                                    data[i].twitter && data[i].twitter !== '' && Speakers.content.display.view1.twitter ?
                                                        <Icon responsive={Speakers.responsiveSettings}
                                                              typography={Speakers.settings.icon1}
                                                              href={`https://twitter.com/${data[i].twitter}`}
                                                              target={'_blank'}
                                                              rel={'noopener'}
                                                              view={'view1'}
                                                        >
                                                            {
                                                                Speakers.content.icon1 && Speakers.content.icon1[this.props.language] ?
                                                                    <i>{Speakers.content.icon1[this.props.language]}</i>
                                                                    : null
                                                            }

                                                        </Icon>
                                                        : null
                                                }

                                                {
                                                    data[i].linkedin && data[i].linkedin !== '' && Speakers.content.display.view1.linkedin ?
                                                        <Icon responsive={Speakers.responsiveSettings}
                                                              typography={Speakers.settings.icon2}
                                                              href={`https://www.linkedin.com/in/${data[i].linkedin}`}
                                                              target={'_blank'}
                                                              rel={'noopener'}
                                                              view={'view1'}
                                                        >
                                                            {
                                                                Speakers.content.icon2 && Speakers.content.icon2[this.props.language] ?
                                                                    <i>{Speakers.content.icon2[this.props.language]}</i>
                                                                    : null
                                                            }

                                                        </Icon>
                                                        : null
                                                }
                                                </BlockCenter>

                                                {data[i].biography !== '' && Speakers.content.display.view1.biography ?
                                                    <BlockText>
                                                        <TextWithView view={'view1'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.biography}> {cutString(data[i].biography)}</TextWithView>
                                                    </BlockText>
                                                    : null}


                                            </div>


                                        </Front>
                                        <Back responsive={TemplateCard ? TemplateCard.responsiveSettings : []}
                                              basis={TemplateCard.settings && TemplateCard.settings.basis ? TemplateCard.settings.basis : {}}>
                                            <div>
                                                <BlockCenter>
                                                    {data[i].firstname !== '' && Speakers.content.display.view2.firstname ?
                                                        <TextWithView view={'view2'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.firstname}>{data[i].firstname} &nbsp;</TextWithView>
                                                        : null}
                                                    {data[i].lastname !== '' && Speakers.content.display.view2.lastname ?
                                                        <TextWithView view={'view2'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.lastname}> {data[i].lastname}</TextWithView>
                                                        : null}
                                                </BlockCenter>

                                                <BlockCenterColumn>
                                                    {data[i].position !== '' && Speakers.content.display.view2.position ?
                                                        <TextWithView view={'view2'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.position}>{data[i].position}</TextWithView>
                                                        : null}
                                                    {data[i].company !== '' && Speakers.content.display.view2.company ?
                                                        <TextWithView view={'view2'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.company}> {data[i].company}</TextWithView>
                                                        : null}
                                                </BlockCenterColumn>
                                                {
                                                    data[i].companyLogo !== '' && Speakers.content.display.view2.companyLogo ?
                                                        <BlockCenter>
                                                            <ImageContainer
                                                                responsive={Speakers.responsiveSettings}
                                                                basis={Speakers.settings.companyLogo}
                                                                view={'view2'}
                                                            >
                                                                <img src={getImagePath(data[i].companyLogo, assetsDirectory)}/>
                                                            </ImageContainer>

                                                        </BlockCenter> : null
                                                }


                                                {data[i].biography !== '' && Speakers.content.display.view2.biography ?
                                                    <BlockText>
                                                        <TextWithView view={'view2'}
                                                                      responsive={Speakers.responsiveSettings}
                                                                      typography={Speakers.settings.biography}> {cutString(data[i].biography)}</TextWithView>
                                                    </BlockText>
                                                    : null}

                                                <BlockCenter>
                                                    {
                                                        data[i].twitter && data[i].twitter !== '' && Speakers.content.display.view2.twitter ?
                                                            <Icon responsive={Speakers.responsiveSettings}
                                                                  typography={Speakers.settings.icon1}
                                                                  href={`https://twitter.com/${data[i].twitter}`}
                                                                  target={'_blank'}
                                                                  rel={'noopener'}
                                                                  view={'view2'}
                                                            >
                                                                {
                                                                    Speakers.content.icon1 && Speakers.content.icon1[this.props.language] ?
                                                                        <i>{Speakers.content.icon1[this.props.language]}</i>
                                                                        : null
                                                                }

                                                            </Icon>
                                                            : null
                                                    }

                                                    {
                                                        data[i].linkedin && data[i].linkedin !== '' && Speakers.content.display.view2.linkedin ?
                                                            <Icon responsive={Speakers.responsiveSettings}
                                                                  typography={Speakers.settings.icon2}
                                                                  href={`https://www.linkedin.com/in/${data[i].linkedin}`}
                                                                  target={'_blank'}
                                                                  rel={'noopener'}
                                                                  view={'view2'}
                                                            >
                                                                {
                                                                    Speakers.content.icon2 && Speakers.content.icon2[this.props.language] ?
                                                                        <i>{Speakers.content.icon2[this.props.language]}</i>
                                                                        : null
                                                                }

                                                            </Icon>
                                                            : null
                                                    }
                                                </BlockCenter>


                                            </div>
                                        </Back>
                                    </Inner>

                                </Card>
                            })
                            : null
                    }

                    {children}
                </Container>
            </Wrapper>

        );
    }
}

const getImagePath = (url, assetsDirectory) => {
    return `${assetsDirectory || ''}${url.substring(url.lastIndexOf('/') + 1)}`
}

const cutString = (string) => {
    if (string.length > 450) {
        return string.substring(0, 450) + '...';
    } else {
        return string;
    }
}

ListSpeakersFlipCard.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                basis: {
                    A: {
                        size: {
                            width: '',
                            height: '',
                            maxWidth: '',
                            maxHeight: ''

                        },
                        padding: {
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0'
                        },
                        margin: {
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
        Title: {
            content: {
                text: {
                    0: 'Salut',
                    1: 'Hello'
                }
            },
            responsiveSettings: ['A'],
            settings: {
                typography: {
                    A: {
                        font: {
                            theme: 'Title1',
                            family: null,
                            typeface: null,
                            weight: null,
                            style: null,
                            size: null,
                            lineHeight: null,
                            letterSpacing: '0'
                        },
                        text: {
                            align: 'center',
                            transform: null,
                            decoration: null
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
                },
                seo: {
                    tag: 'h2'
                }
            }
        },
        Content: {
            content: {
                html: {
                    0: '',
                    1: ''
                }
            },
            responsiveSettings: ['A'],
            settings: {
                typography: {
                    A: {
                        font: {
                            theme: 'Paragraph',
                            family: null,
                            typeface: null,
                            weight: null,
                            style: null,
                            size: null,
                            lineHeight: null,
                            letterSpacing: '0'
                        },
                        text: {
                            align: 'left',
                            transform: null,
                            decoration: null
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
        }
    },
    language: 0
};

ListSpeakersFlipCard.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default ListSpeakersFlipCard;
