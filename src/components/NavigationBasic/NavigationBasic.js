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
    LinkLanguage
} from './styled'
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";
import {getImages} from "../../utils/gettersCommonElement";

import NavigationLink from './NavigationLink';
import SvgBubble from '../../assets/svg/SvgBubble'
import SvgCheck from '../../assets/svg/SvgCheck'
import SvgArrowTop from '../../assets/svg/SvgArrowTop'

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

        if (localStorage.getItem('scrollPosition')) {
            const localStorageScrollPosition = Number(localStorage.getItem('scrollPosition'));
            if (typeof window !== 'undefined' && (!this.props.location.hash || this.props.location.hash === '')) {
                window.scrollTo(0, localStorageScrollPosition);
                localStorage.removeItem('scrollPosition');
            }
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener("scroll", this.listener)
        }
    }

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

    getRenderLinks = (links, slugParent = null) => {
        return links.map((link, i) => {
            const responsiveSettings = this.props.fields['Links'].responsiveSettings;
            const {basis, typography, border} = this.props.fields['Links'].settings;

            const Arrow = link.childrens ? <ArrowContainer><SvgArrowTop/></ArrowContainer> : null;
            const Childrens = link.childrens ? <ul>{this.getRenderLinks(link.childrens, link.slug)}</ul> : null;

            switch (link.type) {
                case 'anchor':
                    return <NavigationLink key={`${i}-${link.name}`}>
                        <Link responsive={responsiveSettings} basis={basis} typography={typography} border={border}
                              onClick={() => this.setState({open: !this.state.open})}
                              href={slugParent ? `/${this.props.locale.split('-')[0]}/${slugParent}#${link.slug}` : `/${this.props.locale.split('-')[0]}/#${link.slug}`}>{link.name}
                            {Arrow}
                        </Link>
                        {Childrens}
                    </NavigationLink>;

                case 'external':
                    return <NavigationLink key={`${i}-${link.name}`}>
                        <Link responsive={responsiveSettings} basis={basis} typography={typography} border={border}
                              target={'_blank'} href={`${link.urlLink}`}>{link.name}
                            {Arrow}
                        </Link>
                        {Childrens}
                    </NavigationLink>;

                case 'internal':
                    return <NavigationLink key={`${i}-${link.name}`}>
                        <Link responsive={responsiveSettings} basis={basis} typography={typography} border={border}
                              className={this.props.location.pathname.includes(link.slug) ? 'selected' : ''}
                              href={`/${this.props.locale.split('-')[0]}/${link.slug}`}>
                            {link.name}
                            {Arrow}
                        </Link>
                        {Childrens}
                    </NavigationLink>;

                case 'null':
                    return <NavigationLink key={`${i}-${link.name}`}>
                        <Link responsive={responsiveSettings} basis={basis} typography={typography} border={border}>
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
        const {fields, locales, locale, location, menu, language} = this.props;

        if (!fields['Bar']) return null

        return (
            <Container responsive={fields['Bar'].responsiveSettings}
                       basis={fields['Bar'].settings.basis}>
                <FixedContainer responsive={fields['Bar'].responsiveSettings}
                                basis={fields['Bar'].settings.basis}
                                burger={fields['Bar'].settings.burger}
                            basisLink={fields['Links'].settings.basis}
                                className={[this.state.open ? 'open' : '', this.state.scrollY && this.state.scrollY > 100 ? 'scrolled' : '']}
                >
                    <Top>
                        <div><a href={`/${locale.split('-')[0]}`} onClick={() => {
                            localStorage.setItem('scrollPosition', 0);
                        }}>
                            {fields['Image'] ? getImages(fields['Image'], language) : null}
                        </a></div>

                        <Hamburger className={this.state.open ? 'open' : ''}
                                   responsive={fields['Bar'].responsiveSettings}
                                   burger={fields['Bar'].settings.burger}
                                   onClick={() => this.setState({open: !this.state.open})}>
                            <LineWrapper>
                                <div/>
                                <div/>
                                <div/>
                            </LineWrapper>
                        </Hamburger>
                    </Top>

                    <Links>
                        <nav>
                            <ul>{menu ? this.getRenderLinks(menu) : null}</ul>
                            <Locale>
                                <CurrentLocale responsive={fields['Bar'].responsiveSettings}
                                               svg={fields['Bar'].settings.svg}>
                                    <LinkLanguage responsive={this.props.fields['Links'].responsiveSettings}
                                                  basis={this.props.fields['Links'].settings.basis}
                                                  typography={this.props.fields['Links'].settings.typography}
                                                  border={this.props.fields['Links'].settings.border}
                                    >
                                        {locale.split('-')[0]}
                                    </LinkLanguage>
                                    <BubbleContainer responsive={fields['Bar'].responsiveSettings}
                                                     svg={fields['Bar'].settings.svg}>
                                        <SvgBubble/>
                                    </BubbleContainer>
                                </CurrentLocale>
                                <LanguageSelector>
                                    {
                                        locales.map((l) => {
                                            return <Link key={l}
                                                         responsive={this.props.fields['Links'].responsiveSettings}
                                                         basis={this.props.fields['Links'].settings.basis}
                                                         typography={this.props.fields['Links'].settings.typography}
                                                         border={this.props.fields['Links'].settings.border}
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
                        </nav>
                    </Links>
                </FixedContainer>
            </Container>
        );
    }
}


NavigationBasic.defaultProps = {};

NavigationBasic.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default NavigationBasic;
