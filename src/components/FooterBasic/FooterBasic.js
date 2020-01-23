import React, {Component} from 'react';
import {Container, Links, Link, FooterContainer, Bullet} from './styled'
import PropTypes from 'prop-types';

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
                    return <li key={i}><Link
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
                    return <li key={i}><Link
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
                    return <li key={i}><Link
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
                    return <li key={i}><Link
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

    render() {
        const {fields, menu} = this.props;

        return (
            <Container>
                <FooterContainer responsive={fields['Template'].responsiveSettings}
                                 basis={fields['Template'].settings.basis}
                >
                    <Links>
                        {
                            menu ? this.getRenderLinks(menu) : null
                        }
                    </Links>
                </FooterContainer>
            </Container>
        );
    }
}


FooterBasic.defaultProps = {};

FooterBasic.propTypes = {
    fields: PropTypes.object.isRequired

};

export default FooterBasic;
