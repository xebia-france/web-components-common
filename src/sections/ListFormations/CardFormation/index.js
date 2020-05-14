import React, {Component} from 'react';
import {Formation, RightContent, ImageBackground, LeftContent, NextSession, IconContainer} from './styled';
import {TextCommon, ContentCommon, CTACommon} from '../../../styles/common.styled'
import {fileNameFromUrl} from '../../../utils/functions'
import { getTextProps} from "../../../utils/gettersProperties";
import SvgElearning from '../../../assets/svg/SvgElearning';

class CardFormation extends Component {
    render() {
        const {data, i, assetsDirectory, config, configCard, CTA} = this.props;

        const Settings = configCard && configCard.settings ? configCard.settings : null;
        const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];

        console.log('DATA ON CARD FORMATION ------------------>', data)
        console.log('CONFIG ON CARD FORMATION ------------------>', config)
        if (!data) return null

        const sessions = data.sessions && data.sessions.value ? JSON.parse(data.sessions.value) : null;

        return <Formation
            responsive={Responsive}
            responsiveContent={configCard.responsiveContent}
            basis={Settings ? Settings.basis : {}}
            border={Settings ? Settings.border : {}}>
            <LeftContent key={i}
                         responsive={config.responsiveSettings}
                         basis={config.settings.image}>
                <ImageBackground
                    key={i}
                    responsive={config.responsiveSettings}
                    basis={config.settings.image}
                    alt={data.name}
                    assetsDirectory={assetsDirectory}
                    asset={fileNameFromUrl(data.image.file.url)}
                />
                {
                    sessions ? <NextSession responsive={config.responsiveSettings}
                                            basis={config.settings.session}>
                        <div>
                            <TextCommon responsive={config.responsiveSettings}
                                        typography={config.settings.textSession}
                                        basis={config.settings.textSession}
                                        border={null}
                                        as={'p'}
                            >Date
                            </TextCommon>
                            <TextCommon responsive={config.responsiveSettings}
                                        typography={config.settings.taglineSession}
                                        basis={config.settings.taglineSession}
                                        border={null}
                                        as={'p'}
                            >prochaine session
                            </TextCommon>
                        </div>
                        <div>
                            <IconContainer
                                responsive={config.responsiveSettings}
                                typography={config.settings.textSession}>
                                <SvgElearning/>
                            </IconContainer>
                        </div>

                    </NextSession> : null
                }
            </LeftContent>

            <RightContent responsive={config.responsiveSettings} basis={config.settings.image}>
                <TextCommon
                    responsive={config.responsiveSettings}
                    typography={config.settings.category}
                    basis={config.settings.category}
                    border={null}
                    as={'p'}
                >
                    {data.category.map(category => category.name).join(' / ')}
                </TextCommon>
                <TextCommon
                    responsive={config.responsiveSettings}
                    typography={config.settings.title}
                    basis={config.settings.title}
                    border={null}
                    as={'h4'}
                >
                    {data.name}
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
                    href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
                >
                    {
                        CTA.content.icon && CTA.content.icon[this.props.language] ?
                            <i>{CTA.content.icon[this.props.language]}</i>
                            : null
                    }
                    <p> {CTA.content.text ? CTA.content.text[this.props.language] : ''}</p>
                </CTACommon>
            </RightContent>
        </Formation>;
    }
}

CardFormation.propTypes = {};

export default CardFormation;
