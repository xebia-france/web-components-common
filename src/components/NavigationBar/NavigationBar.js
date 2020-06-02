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
    BubbleContainer,
    CurrentLocale,
    LanguageSelector,
    CheckContainer,
    ArrowContainer,
    LinkLanguage, FixedBar, Logo, ContainerLeft, LinksChildren
} from './styled'
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";
import {getImages} from "../../utils/gettersCommonElement";
import {ContainerCommon} from "../../styles/common.styled";
import {getTemplateProps, getTextProps} from "../../utils/gettersProperties";

import NavigationLink from './NavigationLink';
import SvgBubble from '../../assets/svg/SvgBubble'
import SvgCheck from '../../assets/svg/SvgCheck'
import SvgArrowTop from '../../assets/svg/SvgArrowTop'

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            prevScrollpos: window.pageYOffset,
            visible: true
        };
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
           // window.addEventListener("scroll", this.listener)
            window.addEventListener("scroll", this.handleScroll);

        }

        /*if (localStorage.getItem('scrollPosition')) {
            const localStorageScrollPosition = Number(localStorage.getItem('scrollPosition'));
            if (typeof window !== 'undefined' && (!this.props.location.hash || this.props.location.hash === '')) {
                window.scrollTo(0, localStorageScrollPosition);
                localStorage.removeItem('scrollPosition');
            }
        }*/
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            //window.removeEventListener("scroll", this.listener)
            window.removeEventListener("scroll", this.handleScroll);

        }
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };

    listener = () => {
        this.setState({
            scrollY: window.scrollY
        })
    }

    getUrlWithLocale = (locale, currentPath) => {
        let result = currentPath.split('/');
        result.splice(1, 1, locale.split('-')[0]);
        return result.join('/')
    }

    getLocalePath = () => {
        if (this.props.locales.length > 1) {
            return `/${this.props.locale.split('-')[0]}`
        } else {
            return ``
        }
    }

    getLinkProps = (field) => {
        return {
            responsive: field ? field.responsiveSettings : [],
            typography: field && field.settings.typography ? field.settings.typography : null,
            basis: field && field.settings.basis ? field.settings.basis : null,
            border: field && field.settings.border ? field.settings.border : null,
        }
    }

    linkIsOpen = () => {
        if (typeof document !== 'undefined') {
            if (document.querySelector('li.open') !== null) {
                return true
            } else {
                return false;
            }
        }
        return false;


    }

    getRenderLinks = (links, slugParent = null) => {
        const { TemplateLinks,TemplateSubLinks, NavigationLinks, NavigationSubLinks } = this.props.fields
        const LinksConfig = !slugParent ? NavigationLinks : NavigationSubLinks;
        const TemplateConfig = !slugParent ? TemplateLinks :TemplateSubLinks

        return links.map((link, i) => {

            const Arrow = link.childrens ? <ArrowContainer><SvgArrowTop/></ArrowContainer> : null;
            const Childrens = link.childrens ?
                <LinksChildren {...getTemplateProps(TemplateSubLinks)} basisLinks={TemplateLinks && TemplateLinks.settings && TemplateLinks.settings.basis ? TemplateLinks.settings.basis : null}>{this.getRenderLinks(link.childrens, link.slug)}</LinksChildren> : null;
            const hadChildren = link.childrens && link.childrens.length !== 0 ? true : false;

            switch (link.type) {
                case 'anchor':
                    return <NavigationLink key={`${i}-${link.name}`} Template={TemplateConfig}
                                           TemplateSubLinks={TemplateSubLinks}
                                           hadChildren={hadChildren}>
                        <Link {...this.getLinkProps(LinksConfig)}
                              onClick={() => this.setState({open: !this.state.open})}
                              href={slugParent ? `${ this.getLocalePath()}/${slugParent}#${link.slug}` : `${this.getLocalePath()}/#${link.slug}`}>{link.name}
                            {Arrow}
                        </Link>
                        {Childrens}
                    </NavigationLink>;

                case 'external':
                    return <NavigationLink key={`${i}-${link.name}`} Template={TemplateConfig} TemplateSubLinks={TemplateSubLinks}
                                           hadChildren={hadChildren}>
                        <Link {...this.getLinkProps(LinksConfig)}
                              target={'_blank'} href={`${link.urlLink}`}>{link.name}
                            {Arrow}
                        </Link>
                        {Childrens}
                    </NavigationLink>;

                case 'internal':
                    return <NavigationLink key={`${i}-${link.name}`} Template={TemplateConfig} TemplateSubLinks={TemplateSubLinks}
                                           hadChildren={hadChildren}>
                        <Link {...this.getLinkProps(LinksConfig)}
                              className={this.props.location.pathname.includes(link.slug) ? 'selected' : ''}
                              href={`${ this.getLocalePath()}/${link.slug}`}>
                            {link.name}
                            {Arrow}
                        </Link>
                        {Childrens}
                    </NavigationLink>;

                case 'null':
                    return <NavigationLink key={`${i}-${link.name}`} Template={TemplateConfig} TemplateSubLinks={TemplateSubLinks}
                                           hadChildren={hadChildren}>
                        <Link {...this.getLinkProps(LinksConfig)}>
                            {link.name}
                            {Arrow}
                        </Link>
                        {Childrens}
                    </NavigationLink>;

                default :
                    return null;
            }
        })
    }

    render() {
        const {fields, locales, locale, location, menu, language, assetsDirectory} = this.props;

        const TemplateLeft = fields['TemplateLeft'];
        const TemplateLinks = fields['TemplateLinks'];
        const TemplateBurger = fields['TemplateBurger'];
        const LinksConfig = fields['NavigationLinks'];
        return (
            <Container>
                <FixedBar
                    className={[this.state.open ? 'open' : '', !this.state.visible ? 'hidden' : '', this.linkIsOpen() ? 'linkOpened' : '']}>
                    <ContainerLeft {...getTemplateProps(TemplateLeft)}>
                        <Logo>
                            {
                                locales && locales.length > 1 ?
                                    <a href={`/${locale.split('-')[0]}`} onClick={() => {
                                        localStorage.setItem('scrollPosition', 0);
                                    }}>
                                        {fields['Image'] ? getImages(fields['Image'], language) : null}
                                    </a>
                                    : <a href={`/`} onClick={() => {
                                        localStorage.setItem('scrollPosition', 0);
                                    }}>
                                        {fields['Image'] ? getImages(fields['Image'], language) : null}
                                    </a>
                            }</Logo>


                        <Hamburger className={this.state.open ? 'open' : ''}
                                   {...getTemplateProps(TemplateBurger)}
                                   onClick={() => this.setState({open: !this.state.open})}>
                            <LineWrapper>
                                <div/>
                                <div/>
                                <div/>
                            </LineWrapper>
                        </Hamburger>
                    </ContainerLeft>

                    <Links {...getTemplateProps(TemplateLinks)}
                           basisTemplateLeft={TemplateLeft && TemplateLeft.settings ? TemplateLeft.settings.basis : null}
                           className={this.state.open ? 'open' : ''}

                    >
                        <nav>
                            <ul>{menu ? this.getRenderLinks(menu) : null}</ul>
                            {
                                locales && locales.length > 1 ?
                                    <Locale>
                                        <CurrentLocale>
                                            <LinkLanguage {...this.getLinkProps(LinksConfig)}>
                                                {locale.split('-')[0]}
                                            </LinkLanguage>
                                        </CurrentLocale>
                                        <LanguageSelector>
                                            {
                                                locales.map((l) => {
                                                    return <Link key={l}
                                                                 {...this.getLinkProps(LinksConfig)}
                                                                 className={l === locale ? '' : ''}
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
                                    : null
                            }

                        </nav>
                    </Links>
                </FixedBar>
            </Container>
        );
    }
}


NavigationBar.defaultProps = {};

NavigationBar.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default NavigationBar;
