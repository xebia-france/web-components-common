import React from 'react';
import {getTemplateProps} from "../../../utils/gettersProperties";
import {Link, ArrowContainer, LinksChildren, ChildrenContainer} from "../styled";
import NavigationLink from '../NavigationLink/index';
import SvgArrowCentered from '../../../assets/svg/SvgArrowCentered';
import {getLocalePath, getLinkProps} from "../utils";


const Links = ({links, fields, currentOpenedLinkIndex, setCurrentOpenedLinkIndex, displayBackground, setDisplayBackground, locales, locale, location, slugParent}) => {
    const {TemplateLinks, TemplateSubLinks, NavigationLinks, NavigationSubLinks, TemplateLeft} = fields
    const LinksConfig = !slugParent ? NavigationLinks : NavigationSubLinks;
    const TemplateConfig = !slugParent ? TemplateLinks : TemplateSubLinks;
    const basisTemplateLeft = getTemplateProps(TemplateLeft).basis;
    const basisTemplateLinks = getTemplateProps(TemplateLinks).basis;
    const noDepth = NavigationSubLinks.settings.state && NavigationSubLinks.settings.state.noDepth === true ? true : false

    const toggleLink = (i) => (currentOpenedLinkIndex === i) ? setCurrentOpenedLinkIndex(null) : setCurrentOpenedLinkIndex(i);

    return links.map((link, i) => {
        const localePath = getLocalePath(locales, locale);
        const hadChildren = link.childrens && link.childrens.length !== 0 ? true : false;
        const params = {
            key: `${i}-${link.name}`,
            open: !slugParent && i === currentOpenedLinkIndex,
            Template: TemplateConfig,
            TemplateSubLinks: TemplateSubLinks,
            LinksConfig : LinksConfig,
            hadChildren: hadChildren
        }

        const Arrow = link.childrens ? <ArrowContainer {...getLinkProps(LinksConfig)}><SvgArrowCentered/></ArrowContainer> : null;
        const Childrens = link.childrens ?
            <ChildrenContainer {...getTemplateProps(TemplateSubLinks)} basisTemplateLeft={basisTemplateLeft} basisLinks={basisTemplateLinks}>
                <LinksChildren {...getTemplateProps(TemplateSubLinks)} basisTemplateLeft={basisTemplateLeft} basisLinks={basisTemplateLinks}>
                    <Links links={link.childrens}
                           fields={fields}
                           currentOpenedLinkIndex={currentOpenedLinkIndex}
                           setCurrentOpenedLinkIndex={setCurrentOpenedLinkIndex}
                           displayBackground={displayBackground}
                           setDisplayBackground={setDisplayBackground}
                           locales={locales}
                           locale={locale}
                           location={location}
                           slugParent={link.slug}
                    />
                </LinksChildren>
            </ChildrenContainer> : null;

        switch (link.type) {
            case 'anchor':
                return <NavigationLink {...params} >
                    <Link {...getLinkProps(LinksConfig)}
                          href={slugParent && !noDepth  ? `${localePath}/${slugParent}#${link.slug}` : `${localePath}/#${link.slug}`}
                          onClick={() => { if (!slugParent) { toggleLink(i)}}}
                    >
                        <span>{link.name}</span>
                        {Arrow}
                    </Link>
                    {Childrens}
                </NavigationLink>;

            case 'external':
                return <NavigationLink {...params}>
                    <Link {...getLinkProps(LinksConfig)}
                          target={'_blank'} rel={'noopener'} href={`${link.urlLink}`}
                          onClick={() => { if (!slugParent) { toggleLink(i)}}}
                    >
                        <span>{link.name}</span>
                        {Arrow}
                    </Link>
                    {Childrens}
                </NavigationLink>;

            case 'internal':
                return <NavigationLink {...params}>
                    <Link {...getLinkProps(LinksConfig)}
                          className={location.pathname.includes(`/${link.slug}`) ? 'active' : ''}
                          href={slugParent && !noDepth ? `${localePath}/${slugParent}/${link.slug}` : `${localePath}/${link.slug}`}
                          onClick={() => { if (!slugParent) { toggleLink(i)}}}
                    >
                        <span>{link.name}</span>
                        {Arrow}
                    </Link>
                    {Childrens}
                </NavigationLink>;

            case 'null':
                return <NavigationLink {...params}>
                    <Link {...getLinkProps(LinksConfig)}
                          className={location.pathname.includes(`/${link.slug}`) ? 'active' : ''}
                          onClick={() => { if (!slugParent) { toggleLink(i)}}}
                    >
                        <span>{link.name}</span>
                        {Arrow}
                    </Link>
                    {Childrens}
                </NavigationLink>;

            default :
                return null;
        }
    })
}

export default Links;