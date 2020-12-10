import React from 'react';
import {Container} from './styled';
import { CTACommon} from '../../../styles/common.styled'
import SvgDotList from '../../../assets/svg/SvgDotList';

const CardFormation = ({data, i, assetsDirectory, configCard,configTitle, CTA}) => {

    if (!data) return null

    const Settings = configCard && configCard.settings ? configCard.settings : null;
    const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];

    return <Container
        key={i}
        as={'a'}
        href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
        responsive={Responsive}
        responsiveContent={configCard.responsiveContent}
        basis={Settings ? Settings.basis : {}}
        border={Settings ? Settings.border : {}}
        typographyCTA={CTA.settings.typography}
        typographyTitle={configTitle.settings.typography}

    >
        <CTACommon
            animateUnderline
            responsive={CTA.responsiveSettings}
            basis={CTA.settings.basis}
            typography={CTA.settings.typography}
            border={CTA.settings.border}
            icon={CTA.settings.icon}
            href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
        >

            <SvgDotList/>
            <p> {data.name ? data.name : ''}</p>
        </CTACommon>
    </Container>

}

CardFormation.propTypes = {};

export default CardFormation;
