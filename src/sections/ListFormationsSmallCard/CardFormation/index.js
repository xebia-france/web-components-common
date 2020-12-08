import React from 'react';
import {
    Formation,
    ContentCard,
    ImageCard,
    Content,
    NextSession,
    IconContainer,
    NextSessionPromo,
    NextSessionDefault, Container, Badges
} from './styled';
import {TextCommon, CTACommon} from '../../../styles/common.styled'
import {fileNameFromUrl} from '../../../utils/functions'
import SvgElearning from '../../../assets/svg/SvgElearning';
import SvgFormation from '../../../assets/svg/SvgFormation';
import SvgPromo from '../../../assets/svg/SvgPromo';
import {generatePictureWebP} from "../../../utils/gettersCommonElement";

const CardFormation = ({data, i, assetsDirectory, config, configCard, configTitle, CTA}) => {

    const filterPastSessions = (schedule) => {
        const currentDate = new Date();
        return schedule.filter(session => new Date(session.startTime).getTime() >= currentDate.getTime())
    }

    const sortByIncreasingStart = (sessions) => sessions.sort((a, b) => {
        return new Date(a.startTime) - new Date(b.startTime);
    });

    const getNextSession = (sessions) => {
        if (!sessions.schedule || sessions.schedule.length === 0) return null;
        const nextSessions = filterPastSessions(sessions.schedule);

        if (nextSessions.length === 0) return null;
        return sortByIncreasingStart(nextSessions)[0];
    }

    const getStartTimeString = (session) => {
        const nextSessionStart = new Date(session.startTime);
        return `${nextSessionStart.toLocaleDateString('fr-FR', {month: 'long', day: 'numeric'})} `;
    }

    const getNextPromo = (sessions) => {
        if (!sessions.schedule || sessions.schedule.length === 0) return null;
        const nextSessions = filterPastSessions(sessions.schedule)
        const sessionsWithPromo = nextSessions.filter(session => session.promo.available);

        if (sessionsWithPromo.length === 0) return null;

        return sortByIncreasingStart(sessionsWithPromo)[0];
    }

    const getBadges = (badges, config, name) => badges.map((badge, i) => {
        if (i < 2) {
            return <ImageCard
                key={i}
                responsive={config.responsiveSettings}
                basis={config.settings.image}
                alt={name}
            >
                {generatePictureWebP(badge.image.file.url.startsWith('https://') ? file : `/assets/${ fileNameFromUrl(badge.image.file.url) }`, '')}
            </ImageCard>
        }
    })


    const Settings = configCard && configCard.settings ? configCard.settings : null;
    const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];

    if (!data) return null

    const sessions = data.sessions && data.sessions.value ? JSON.parse(data.sessions.value) : null;

    const nextSession = sessions ? getNextSession(sessions) : null;
    const nextPromo = sessions ? getNextPromo(sessions) : null;


    return <Container
        key={i}
        as={'a'}
        href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
        responsive={Responsive}
        basis={Settings ? Settings.basis : {}}
        typographyCTA={CTA.settings.typography}

    >
        <Formation
            responsive={Responsive}
            responsiveContent={configCard.responsiveContent}
            basis={Settings ? Settings.basis : {}}
            border={Settings ? Settings.border : {}}
        >
            <Content>
                {
                    data.badge !== null && data.badge.length !== 0 ?
                        <Badges>{getBadges(data.badge, config, data.name)}</Badges>

                        : <ImageCard
                            key={i}
                            responsive={config.responsiveSettings}
                            basis={config.settings.image}
                            alt={name}
                        ><SvgFormation/></ImageCard>
                }
                <ContentCard>
                    <TextCommon
                        responsive={configTitle.responsiveSettings}
                        typography={configTitle.settings.typography}
                        basis={configTitle.settings.basis}
                        border={null}
                        as={'p'}
                    >
                        {data.category.map(category => category.name).join(' / ')}
                    </TextCommon>
                    <CTACommon
                        animateUnderline
                        responsive={CTA.responsiveSettings}
                        basis={CTA.settings.basis}
                        typography={CTA.settings.typography}
                        border={CTA.settings.border}
                        icon={CTA.settings.icon}
                        href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
                    >
                        <p> {data.name ? data.name : ''}</p>
                    </CTACommon>
                </ContentCard>
            </Content>
        </Formation>
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
                        >{getStartTimeString(nextPromo)}
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
                             basis={config.settings.session}
                             noBackground={nextSession.type !== 'a_distance'}

                >
                    <div>
                        <TextCommon responsive={config.responsiveSettings}
                                    typography={config.settings.textSession}
                                    basis={config.settings.textSession}
                                    border={null}
                                    as={'p'}
                        >{getStartTimeString(nextSession)}
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
        {
            !nextSession && !nextPromo ?
                <NextSessionDefault>
                    <div>
                        <TextCommon responsive={config.responsiveSettings}
                                    typography={config.settings.textSession}
                                    basis={config.settings.textSession}
                                    border={null}
                                    as={'p'}
                        ></TextCommon>
                        <TextCommon responsive={config.responsiveSettings}
                                    typography={config.settings.taglineSession}
                                    basis={config.settings.taglineSession}
                                    border={null}
                                    as={'p'}
                        ></TextCommon>
                    </div>
                </NextSessionDefault>
                : null
        }
    </Container>

}

CardFormation.propTypes = {};

export default CardFormation;
