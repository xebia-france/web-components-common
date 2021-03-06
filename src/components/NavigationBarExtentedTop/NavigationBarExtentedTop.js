import React, {Component} from 'react';
import {Container, Links, Link, Hamburger, LineWrapper, FixedContainer, Top, Locale, ImageContainer} from './styled'
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";
import {generatePictureWebP} from "../../utils/gettersCommonElement";

class NavigationBarExtentedTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    getUrlWithLocale = (locale, currentPath) => {
        let result = currentPath.split('/');
        result.splice(1, 1, locale.split('-')[0]);
        return result.join('/')
    }

    getRenderLinks = (links, slugParent = null) => {
        return links.map((link) => {
            switch (link.type) {
                case 'anchor':
                    return <li><Link
                        responsive={this.props.fields['LinksContainer'].responsiveSettings}
                        basis={this.props.fields['LinksContainer'].settings.basis}
                        typography={this.props.fields['LinksContainer'].settings.typography}
                        border={this.props.fields['LinksContainer'].settings.border}
                        href={slugParent ? `/${this.props.locale.split('-')[0]}/${slugParent}#${link.slug}` : `/${this.props.locale.split('-')[0]}/#${link.slug}`}>{link.name}</Link>
                        <ul>
                        {
                            link.childrens ?  this.getRenderLinks(link.childrens) : null
                        }
                        </ul>
                    </li>;

                case 'external':
                    return <li><Link
                        responsive={this.props.fields['LinksContainer'].responsiveSettings}
                        basis={this.props.fields['LinksContainer'].settings.basis}
                        typography={this.props.fields['LinksContainer'].settings.typography}
                        border={this.props.fields['LinksContainer'].settings.border}
                        rel={'noopener'}
                        target={'_blank'} href={`${link.urlLink}`}>{link.name}</Link>
                        <ul>
                        {
                             link.childrens ?  this.getRenderLinks(link.childrens) : null
                        }
                        </ul>
                    </li>;

                case 'internal':
                    return <li><Link
                        responsive={this.props.fields['LinksContainer'].responsiveSettings}
                        basis={this.props.fields['LinksContainer'].settings.basis}
                        typography={this.props.fields['LinksContainer'].settings.typography}
                        border={this.props.fields['LinksContainer'].settings.border}
                        className={this.props.location.pathname.includes(link.slug) ? 'selected' : ''}
                        href={`/${this.props.locale.split('-')[0]}/${link.slug}`}>{link.name}</Link>
                        <ul>
                        {
                            link.childrens ?  this.getRenderLinks(link.childrens, link.slug) : null
                        }
                        </ul>
                    </li>;

                case 'null':
                    return <li><Link
                        responsive={this.props.fields['LinksContainer'].responsiveSettings}
                        basis={this.props.fields['LinksContainer'].settings.basis}
                        typography={this.props.fields['LinksContainer'].settings.typography}
                        border={this.props.fields['LinksContainer'].settings.border}
                    >{link.name}</Link>
                        <ul>
                        {
                            link.childrens ?  this.getRenderLinks(link.childrens) : null
                        }
                        </ul>
                    </li>;

                default :
                    return null;
            }


        })
    }

    getImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) {
                return null
            } else {
                return (
                    <ImageContainer key={i}
                                    responsive={field.responsiveSettings}
                                    basis={field.settings.basis}>
                        { generatePictureWebP(`${this.props.assetsDirectory || ''}${ file }`, image.alt[this.props.language]) }
                    </ImageContainer>);
            }

        });
    }

    render() {
        const {fields, locales, locale, location, menu, scrollPosition} = this.props;

        return (
            <Container>
                <FixedContainer responsive={fields['Bar'].responsiveSettings}
                                basis={fields['Bar'].settings.basis}
                                className={[this.state.open ? 'open' : '', scrollPosition && scrollPosition > 100 ? 'scrolled' : '']}

                >
                    <Top>
                        <div><a href={`/${locale.split('-')[0]}`}>
                            {
                                this.getImages(fields['Image'])
                            }
                        </a></div>

                        <Hamburger className={this.state.open ? 'open' : ''}
                                   onClick={() => this.setState({open: !this.state.open})}>
                            <LineWrapper>
                                <div/>
                                <div/>
                                <div/>
                            </LineWrapper>
                        </Hamburger>
                    </Top>

                    <Links className={this.state.open ? 'open' : ''}>
                        {
                            menu ?

                                this.getRenderLinks(menu)

                                : null
                        }
                        <Locale>
                            {
                                locales.map((l) => {
                                    return <Link responsive={this.props.fields['LinksContainer'].responsiveSettings}
                                                 basis={this.props.fields['LinksContainer'].settings.basis}
                                                 typography={this.props.fields['LinksContainer'].settings.typography}
                                                 border={this.props.fields['LinksContainer'].settings.border}
                                                 className={l === locale ? 'selected' : ''}
                                                 href={this.getUrlWithLocale(l, location.pathname)}
                                    >
                                        {l.split('-')[0]}
                                    </Link>
                                })
                            }
                        </Locale>
                    </Links>

                </FixedContainer>
            </Container>
        );
    }
}


NavigationBarExtentedTop.defaultProps = {
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

NavigationBarExtentedTop.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default NavigationBarExtentedTop;
