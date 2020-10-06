import React, {useState, useEffect} from 'react';
import {
    Container,
    LinksContainer,
    Link,
    Locale,
    CurrentLocale,
    LanguageSelector,
    CheckContainer,
    LinkLanguage,
    FixedBar,
    Logo,
    ContainerLeft,
    Toggle,
    IconToggle,
    ClosingArea
} from './styled'
import PropTypes from 'prop-types';
import {getImages} from "../../utils/gettersCommonElement";
import {getTemplateProps} from "../../utils/gettersProperties";
import {getLinkProps, getUrlWithLocale, linkIsOpen, enableScrolling, disableScrolling, onTopPage} from "./utils";
import SvgCheck from '../../assets/svg/SvgCheck';
import Links from './Links';


const NavigationBarFromLeft = ({fields, locales, locale, location, menu, language, assetsDirectory}) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [currentOpenedLinkIndex, setCurrentOpenedLinkIndex] = useState(null);
    const [displayBackground, setDisplayBackground] = useState(false);
    const [precedentScrollY, setPrecedentScrollY] = useState(undefined);

    useEffect(() => {

        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            const currentScrollY = window.scrollY;
            const isVisible = precedentScrollY >= currentScrollPos || precedentScrollY === 0;

            setScrollY(currentScrollY);
            setPrecedentScrollY(currentScrollPos);
            setVisible(isVisible);
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        if (localStorage.getItem('scrollPosition')) {
            const localStorageScrollPosition = Number(localStorage.getItem('scrollPosition'));
            if (typeof window !== 'undefined' && (!location.hash || location.hash === '')) {
                window.scrollTo(0, localStorageScrollPosition);
                localStorage.removeItem('scrollPosition');
            }
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollY]);


    const {TemplateLeft, TemplateLinks, TemplateSubLinks, NavigationLinks, NavigationSubLinks} = fields;

    return (
        <Container>
            <FixedBar {...getTemplateProps(TemplateLeft)}
                      className={[
                          open ? 'open' : '',
                          visible ? 'visible' : '',
                          (!visible && !onTopPage()) ? 'hidden' : '',
                          linkIsOpen() ? 'linkOpened' : '']}
            >
                <ClosingArea open={open} openSubLink={currentOpenedLinkIndex !== null}
                             onClick={() => {
                                 setOpen(false);
                                 setCurrentOpenedLinkIndex(null);
                                 enableScrolling();
                                 setVisible(true);
                             }}/>
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

                    <Toggle className={open ? 'open' : ''}
                            {...getLinkProps(NavigationLinks)}
                            basisTemplateLeft={getTemplateProps(TemplateLeft).basis}
                            onClick={() => {
                                if (open) {
                                    setOpen(false);
                                    setCurrentOpenedLinkIndex(null);
                                    enableScrolling();
                                    setVisible(true)
                                } else {
                                    setOpen(true);
                                    disableScrolling();
                                    setVisible(true);
                                }
                            }}
                    >
                        <IconToggle/>
                        <span>{open ? 'fermer' : 'menu'}</span>
                    </Toggle>
                </ContainerLeft>

                <LinksContainer {...getTemplateProps(TemplateLinks)}
                                basisTemplateLeft={TemplateLeft && TemplateLeft.settings ? TemplateLeft.settings.basis : null}
                                className={open ? 'open' : ''}
                >
                    <nav>
                        <ul>
                            {menu && <Links links={menu}
                                            fields={fields}
                                            currentOpenedLinkIndex={currentOpenedLinkIndex}
                                            setCurrentOpenedLinkIndex={setCurrentOpenedLinkIndex}
                                            displayBackground={displayBackground}
                                            setDisplayBackground={setDisplayBackground}
                                            locales={locales}
                                            locale={locale}
                                            location={location}
                                            slugParent={null}/>
                            }
                        </ul>
                        {
                            locales && locales.length > 1 ?
                                <Locale>
                                    <CurrentLocale>
                                        <LinkLanguage {...getLinkProps(NavigationLinks)}>
                                            {locale.split('-')[0]}
                                        </LinkLanguage>
                                    </CurrentLocale>
                                    <LanguageSelector>
                                        {
                                            locales.map((l) => {
                                                return <Link key={l}
                                                             {...getLinkProps(NavigationLinks)}
                                                             className={l === locale ? '' : ''}
                                                             href={getUrlWithLocale(l, location.pathname)}
                                                             onClick={() => {
                                                                 localStorage.setItem('scrollPosition', windowScroll);
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
                </LinksContainer>
            </FixedBar>
        </Container>
    )
}

NavigationBarFromLeft.defaultProps = {};

NavigationBarFromLeft.propTypes = {
    fields: PropTypes.object.isRequired,
    language: PropTypes.number.isRequired
};

export default NavigationBarFromLeft;