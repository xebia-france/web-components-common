import React, {Component} from 'react';
import {
    Container,
    Links,
    Link,
    Hamburger,
    LineWrapper,
    FixedContainer,
    Top,
    Locale,
    ImageContainer,
    BubbleContainer,
    CurrentLocale,
    LanguageSelector,
    CheckContainer,
    ArrowContainer
} from './styled'
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";
import NavigationLink from './NavigationLink';
import SvgBubble from '../../assets/svg/SvgBubble'
import SvgCheck from '../../assets/svg/SvgCheck'
import SvgArrowTop from '../../assets/svg/SvgArrowTop'

let scrollPositions = null;

class NavigationBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", this.listener)
        }

        if(localStorage.getItem('scrollPosition')){
            const localStorageScrollPosition = Number(localStorage.getItem('scrollPosition'));

            if(typeof window !== 'undefined' && (!this.props.location.hash || this.props.location.hash === '') ){
                window.scrollTo(0, localStorageScrollPosition);
            }
        }

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener("scroll", this.listener)
        }
    }

    listener = () => {
        scrollPositions = window.scrollY;
        this.setState({
            scrollY: window.scrollY
        })
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
                    return <NavigationLink><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                        href={slugParent ? `/${this.props.locale.split('-')[0]}/${slugParent}#${link.slug}` : `/${this.props.locale.split('-')[0]}/#${link.slug}`}>{link.name}
                        {
                            link.childrens ? <ArrowContainer>
                                <SvgArrowTop/>
                            </ArrowContainer> : null
                        }
                    </Link>
                        <ul>
                            {
                                link.childrens ? this.getRenderLinks(link.childrens) : null
                            }
                        </ul>
                    </NavigationLink>;

                case 'external':
                    return <NavigationLink><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                        target={'_blank'} href={`${link.urlLink}`}>{link.name}
                        {
                            link.childrens ? <ArrowContainer>
                                <SvgArrowTop/>
                            </ArrowContainer> : null
                        }
                    </Link>
                        <ul>
                            {
                                link.childrens ? this.getRenderLinks(link.childrens) : null
                            }
                        </ul>
                    </NavigationLink>;

                case 'internal':
                    return <NavigationLink><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                        className={this.props.location.pathname.includes(link.slug) ? 'selected' : ''}
                        href={`/${this.props.locale.split('-')[0]}/${link.slug}`}>
                        {link.name}
                        {
                            link.childrens ? <ArrowContainer>
                                <SvgArrowTop/>
                            </ArrowContainer> : null
                        }
                    </Link>

                        <ul>
                            {
                                link.childrens ? this.getRenderLinks(link.childrens, link.slug) : null
                            }
                        </ul>
                    </NavigationLink>;

                case 'null':
                    return <NavigationLink><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                    >{link.name}
                        {
                            link.childrens ? <ArrowContainer>
                                <SvgArrowTop/>
                            </ArrowContainer> : null
                        }
                    </Link>
                        <ul>
                            {
                                link.childrens ? this.getRenderLinks(link.childrens) : null
                            }
                        </ul>
                    </NavigationLink>;

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
                        <img alt={image.alt[this.props.language]} src={`${this.props.assetsDirectory || ''}${ file }`}/>
                    </ImageContainer>);
            }

        });
    }

    render() {
        const {fields, locales, locale, location, menu} = this.props;

        return (
            <Container responsive={fields['Bar'].responsiveSettings}
                       basis={fields['Bar'].settings.basis}>
                <FixedContainer responsive={fields['Bar'].responsiveSettings}
                                basis={fields['Bar'].settings.basis}
                                className={[this.state.open ? 'open' : '', this.state.scrollY && this.state.scrollY > 100 ? 'scrolled' : '']}

                >
                    <Top>
                        <div><a href={`/${locale.split('-')[0]}`} onClick={() => {
                            localStorage.setItem('scrollPosition', 0);
                        }}>
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
                            <CurrentLocale>
                                <Link responsive={this.props.fields['Links'].responsiveSettings}
                                      basis={this.props.fields['Links'].settings.basis}
                                      typography={this.props.fields['Links'].settings.typography}
                                      border={this.props.fields['Links'].settings.border}

                                >
                                    {locale.split('-')[0]}
                                </Link>
                                <BubbleContainer>
                                    <SvgBubble/>
                                </BubbleContainer>
                            </CurrentLocale>
                            <LanguageSelector>
                                {
                                    locales.map((l) => {
                                        return <Link responsive={this.props.fields['Links'].responsiveSettings}
                                                     basis={this.props.fields['Links'].settings.basis}
                                                     typography={this.props.fields['Links'].settings.typography}
                                                     border={this.props.fields['Links'].settings.border}
                                                     className={l === locale ? 'selected' : ''}
                                                     href={this.getUrlWithLocale(l, location.pathname)}
                                                     onClick={() => {
                                                         localStorage.setItem('scrollPosition', this.state.scrollY);
                                                     }}
                                        >
                                            {l.split('-')[0]}
                                            <CheckContainer className={l === locale ? 'selected' : ''}>
                                                <SvgCheck/>
                                            </CheckContainer>
                                        </Link>
                                    })
                                }
                            </LanguageSelector>
                        </Locale>
                    </Links>
                </FixedContainer>
            </Container>
        );
    }
}


class LinkMenu extends Component {
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


    render() {
        const {children} = this.props;


        return (<ul>
                {children}
            </ul>
        );
    }
}

NavigationBasic.defaultProps = {
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

NavigationBasic.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default NavigationBasic;
