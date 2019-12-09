import React, {Component} from 'react';
import {Container, Links, Link, Hamburger, LineWrapper, FixedContainer, Top, Locale, ImageContainer} from './styled'
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

class NavigationBasic extends Component {
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

    getLinksByLanguage = () => {
        console.log('getLinksByLanguage locale', this.props.locale)
        console.log('getLinksByLanguage locale', this.props.menu)
        const links = this.props.menu.edges.filter((edge) => edge.node.node_locale === this.props.locale)[0].node.menuHeader
        console.log('getLinksByLanguage links', links)
        return links;
    }

    getRenderLinks = (links) => {
        return links.map((link) => {
            switch (link.type) {
                case 'anchor':
                    return <li><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                        href={`${this.props.location.pathname}#${link.slug}`}>{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens)}</div> : null
                        }
                    </li>;

                case 'external':
                    return <li><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                        target={'_blank'} href={`${link.urlLink}`}>{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens)}</div> : null
                        }
                    </li>;

                case 'internal':
                    return <li><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                        className={ this.props.location.pathname.includes(link.slug) ? 'selected' : ''}
                        href={`/${this.props.locale.split('-')[0]}/${link.slug}`}>{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens)}</div> : null
                        }
                    </li>;

                case 'null':
                    return <li><Link
                        responsive={this.props.fields['Links'].responsiveSettings}
                        basis={this.props.fields['Links'].settings.basis}
                        typography={this.props.fields['Links'].settings.typography}
                        border={this.props.fields['Links'].settings.border}
                    >{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens)}</div> : null
                        }
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
                        <img alt={image.alt[this.props.language]} src={`${this.props.assetsDirectory || ''}${ file }`}/>
                    </ImageContainer>);
            }

        });
    }

    render() {
        const {fields, locales, locale, location, menu} = this.props;

        console.log('LOCATION', location)
        console.log('MENU', menu)
        console.log('MENU Fields', fields)
        this.getLinksByLanguage();


        return (
            <Container responsive={fields['Bar'].responsiveSettings}
                       basis={fields['Bar'].settings.basis}>
                <FixedContainer responsive={fields['Bar'].responsiveSettings}
                                basis={fields['Bar'].settings.basis}
                                className={this.state.open ? 'open' : ''}

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
                            this.getLinksByLanguage() ?

                                this.getRenderLinks(this.getLinksByLanguage())

                                : null
                        }
                        <Locale>
                            {
                                locales.map((l) => {
                                    return <Link responsive={this.props.fields['Links'].responsiveSettings}
                                                 basis={this.props.fields['Links'].settings.basis}
                                                 typography={this.props.fields['Links'].settings.typography}
                                                 border={this.props.fields['Links'].settings.border}
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
