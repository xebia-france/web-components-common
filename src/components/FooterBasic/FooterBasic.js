import React, {Component} from 'react';
import {Container, Links, Link, FixedContainer, Bullet, ImageContainer} from './styled'
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

class FooterBasic extends Component {
    constructor(props) {
        super(props);

    }

    getRenderLinks = (links, parentUrl) => {

        return links.map((link, i) => {

            const fieldLinks = this.props.fields['Links'];
            const settings = fieldLinks.settings;
            switch (link.type) {
                case 'anchor':
                    return <li><Link
                        responsive={fieldLinks.responsiveSettings}
                        basis={settings.basis}
                        typography={settings.typography}
                        border={settings.border}
                        href={parentUrl ? `${parentUrl}#${link.slug}` : `/${this.props.locale.split('-')[0]}/#${link.slug}`}>{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens)}</div> : null
                        }
                        {
                            i !== (links.length - 1) ? <Bullet responsive={fieldLinks.responsiveSettings}
                                                               typography={settings.typography}>&#8226;</Bullet> : null
                        }
                    </li>;

                case 'external':
                    return <li><Link
                        responsive={fieldLinks.responsiveSettings}
                        basis={settings.basis}
                        typography={settings.typography}
                        border={settings.border}
                        target={'_blank'} href={`${link.urlLink}`}>{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens)}</div> : null
                        }
                        {
                            i !== (links.length - 1) ? <Bullet responsive={fieldLinks.responsiveSettings}
                                                               typography={settings.typography}>&#8226;</Bullet> : null
                        }
                    </li>;

                case 'internal':
                    return <li><Link
                        responsive={fieldLinks.responsiveSettings}
                        basis={settings.basis}
                        typography={settings.typography}
                        border={settings.border}
                        className={ this.props.location.pathname.includes(link.slug) ? 'selected' : ''}
                        href={`/${this.props.locale.split('-')[0]}/${link.slug}`}>{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens, `/${this.props.locale.split('-')[0]}/${link.slug}` )}</div> : null
                        }
                        {
                            i !== (links.length - 1) ? <Bullet responsive={fieldLinks.responsiveSettings}
                                                               typography={settings.typography}>&#8226;</Bullet> : null
                        }
                    </li>;

                case 'null':
                    return <li><Link
                        responsive={fieldLinks.responsiveSettings}
                        basis={settings.basis}
                        typography={settings.typography}
                        border={settings.border}
                        className={'disabledHover'}
                    >{link.name}</Link>
                        {
                            link.childrens ? <div> {this.getRenderLinks(link.childrens)}</div> : null
                        }
                        {
                             i !== (links.length - 1) ? <Bullet responsive={fieldLinks.responsiveSettings}
                                                                typography={settings.typography}>&#8226;</Bullet> : null
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

        return (
            <Container responsive={fields['Template'].responsiveSettings}
                       basis={fields['Template'].settings.basis}>
                <FixedContainer responsive={fields['Template'].responsiveSettings}
                                basis={fields['Template'].settings.basis}
                >
                    {/*<Top>
                        <div><a href={`/${locale.split('-')[0]}`}>
                            {
                                this.getImages(fields['Image'])
                            }
                        </a></div>

                    </Top>*/}

                    <Links>
                        {
                            menu ? this.getRenderLinks(menu) : null
                        }
                    </Links>
                </FixedContainer>
            </Container>
        );
    }
}


FooterBasic.defaultProps = {
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

FooterBasic.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default FooterBasic;
