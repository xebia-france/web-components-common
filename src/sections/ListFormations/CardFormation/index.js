import React, {Component} from 'react';
import {Formation, RightContent, ImageBackground, LeftContent, NextSession, IconContainer, NextSessionPromo} from './styled';
import {TextCommon, ContentCommon, CTACommon} from '../../../styles/common.styled'
import {fileNameFromUrl} from '../../../utils/functions'
import SvgElearning from '../../../assets/svg/SvgElearning';
import SvgPromo from '../../../assets/svg/SvgPromo';

class CardFormation extends Component {
    filterPastSessions = (schedule) => {
        const currentDate = new Date();
        return schedule.filter(session => new Date(session.startTime).getTime() >= currentDate.getTime())
    }

    sortByIncreasingStart = (sessions) => sessions.sort((a, b) => {
        return new Date(a.startTime) - new Date(b.startTime);
    });

    getNextSession = (sessions) => {
        if (!sessions.schedule || sessions.schedule.length === 0) return null;
        const nextSessions = this.filterPastSessions(sessions.schedule);

        if (nextSessions.length === 0) return null;
        return this.sortByIncreasingStart(nextSessions)[0];
    }

    getStartTimeString = (session) => {
        const nextSessionStart = new Date(session.startTime);
        return `${nextSessionStart.toLocaleDateString('fr-FR', {month: 'long', day: 'numeric'})} `;
    }

    getNextPromo = (sessions) => {
        if (!sessions.schedule || sessions.schedule.length === 0) return null;
        const nextSessions = this.filterPastSessions(sessions.schedule)
        const sessionsWithPromo = nextSessions.filter(session => session.promo.available);

        if (sessionsWithPromo.length === 0) return null;

        return this.sortByIncreasingStart(sessionsWithPromo)[0];
    }

    render() {
        const {data, i, assetsDirectory, config, configCard, CTA} = this.props;

        const Settings = configCard && configCard.settings ? configCard.settings : null;
        const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];

        if (!data) return null

        const sessions = data.sessions && data.sessions.value ? JSON.parse(data.sessions.value) : null;

        const nextSession = sessions ? this.getNextSession(sessions) : null;
        const nextPromo = sessions ? this.getNextPromo(sessions) : null;


        return <Formation
            responsive={Responsive}
            responsiveContent={configCard.responsiveContent}
            basis={Settings ? Settings.basis : {}}
            border={Settings ? Settings.border : {}}>
            <LeftContent key={i}
                         as={'a'}
                         href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
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
                    nextPromo ?
                        <NextSessionPromo responsive={config.responsiveSettings}
                                     basis={config.settings.promo}>
                            <div>
                                <TextCommon responsive={config.responsiveSettings}
                                            typography={config.settings.textPromo}
                                            basis={config.settings.textPromo}
                                            border={null}
                                            as={'p'}
                                >{this.getStartTimeString(nextPromo)}
                                </TextCommon>
                                <TextCommon responsive={config.responsiveSettings}
                                            typography={config.settings.taglinePromo}
                                            basis={config.settings.taglinePromo}
                                            border={null}
                                            as={'p'}
                                >{`${ nextPromo.promo.price } au lieu ${ sessions.pricing.inter.price  }`}
                                </TextCommon>
                            </div>
                            <div>
                                <IconContainer
                                    responsive={config.responsiveSettings}
                                    typography={config.settings.textPromo}>
                                    <SvgPromo/>
                                </IconContainer>
                            </div>

                        </NextSessionPromo>
                        : null
                }
                {
                    nextSession && !nextPromo ?
                        <NextSession responsive={config.responsiveSettings}
                                     basis={config.settings.session}>
                            <div>
                                <TextCommon responsive={config.responsiveSettings}
                                            typography={config.settings.textSession}
                                            basis={config.settings.textSession}
                                            border={null}
                                            as={'p'}
                                >{this.getStartTimeString(nextSession)}
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
                                {
                                    nextSession.type !== 'a_distance' ? null :
                                        <IconContainer
                                            responsive={config.responsiveSettings}
                                            typography={config.settings.textSession}>
                                            <SvgElearning/>
                                        </IconContainer>
                                }

                            </div>
                        </NextSession>
                        : null
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
                    as={'h3'}
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
