import React, {Component} from 'react';
import {Container, RightContent, ImageBackground, LeftContent, NextSession, IconContainer, NextSessionPromo} from './styled';
import {TextCommon, ContentCommon, CTACommon} from '../../../styles/common.styled'
import {fileNameFromUrl} from '../../../utils/functions'

class Card extends Component {



    render() {
        const {data, i, assetsDirectory, config, configCard, CTA} = this.props;
        console.log('DATA', data);

        const Settings = configCard && configCard.settings ? configCard.settings : null;
        const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];

        if (!data) return null

        return <Container
            responsive={Responsive}
            responsiveContent={configCard.responsiveContent}
            basis={Settings ? Settings.basis : {}}
            border={Settings ? Settings.border : {}}>
            <LeftContent key={i}
                         as={'a'}
                         target={data.link && data.link.startsWith('http') ? '_blank' : '_self'}
                         href={data.link ? `${data.link}` : ''}
                         responsive={config.responsiveSettings}
                         basis={config.settings.image}>
                <ImageBackground
                    key={i}
                    responsive={config.responsiveSettings}
                    basis={config.settings.image}
                    alt={data.name}
                    assetsDirectory={assetsDirectory}
                    asset={fileNameFromUrl(data.smallImage.file.url)}
                />
            </LeftContent>

            <RightContent responsive={config.responsiveSettings} basis={config.settings.image}>
                { data.subTitle &&
                    <TextCommon
                     responsive={config.responsiveSettings}
                     typography={config.settings.tagline}
                     basis={config.settings.tagline}
                     border={null}
                     as={'p'}
                 >
                        {data.subTitle}
                 </TextCommon>
                }

                <TextCommon
                    responsive={config.responsiveSettings}
                    typography={config.settings.title}
                    basis={config.settings.title}
                    border={null}
                    as={'h3'}
                >
                    {data.title}
                </TextCommon>
                <ContentCommon
                    responsive={config.responsiveSettings}
                    typography={config.settings.text}
                    basis={config.settings.text}
                    dangerouslySetInnerHTML={{
                        __html: data.shortPresentation.childMarkdownRemark ? data.shortPresentation.childMarkdownRemark.html :
                            <p></p>
                    }}
                />
                <CTACommon
                    animateUnderline
                    responsive={CTA.responsiveSettings}
                    basis={CTA.settings.basis}
                    typography={CTA.settings.typography}
                    border={CTA.settings.border}
                    icon={CTA.settings.icon}
                    href={data.link}
                    target={data.link && data.link.startsWith('http') ? '_blank' : '_self'}
                >
                    {
                        CTA.content.icon && CTA.content.icon[this.props.language] ?
                            <i>{CTA.content.icon[this.props.language]}</i>
                            : null
                    }
                    <p> {CTA.content.text ? CTA.content.text[this.props.language] : ''}</p>
                </CTACommon>
            </RightContent>
        </Container>;
    }
}

Card.propTypes = {};

export default Card;
