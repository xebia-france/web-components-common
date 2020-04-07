import React, {Component} from 'react';
import { Formation, RightContent, ImageBackground } from './styled';
import { TextCommon, ContentCommon, CTACommon } from '../../../styles/common.styled'
import { fileNameFromUrl } from '../../../utils/functions'

class CardFormation extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {data, i, assetsDirectory, config, configCard, CTA} = this.props;

        const Settings = configCard && configCard.settings ? configCard.settings : null;
        const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];

        if(!data) return null
        return <Formation
            responsive={Responsive}
            responsiveContent={configCard.responsiveContent}
            basis={Settings ? Settings.basis : {}}
            border={Settings ? Settings.border : {}}>
            <ImageBackground
                key={i}
                responsive={config.responsiveSettings}
                basis={config.settings.image}
                alt={data.name}
                assetsDirectory={assetsDirectory}
                asset={fileNameFromUrl(data.image.file.url)}
            />

            <RightContent responsive={config.responsiveSettings}  basis={config.settings.image}>
                <TextCommon
                    responsive={config.responsiveSettings}
                    typography={config.settings.category}
                    basis={config.settings.category}
                    border={null}
                    as={'p'}
                >
                    { data.category.map( category => category.name).join(' / ') }
                </TextCommon>
                <TextCommon
                    responsive={config.responsiveSettings}
                    typography={config.settings.title}
                    basis={config.settings.title}
                    border={null}
                    as={'h4'}
                >
                    { data.name }
                </TextCommon>
                <ContentCommon
                    responsive={config.responsiveSettings}
                    typography={config.settings.text}
                    basis={config.settings.text}
                    dangerouslySetInnerHTML={{
                        __html: data.description.childMarkdownRemark ? data.description.childMarkdownRemark.html :
                            <p></p>
                    }}
                />
                <CTACommon
                    responsive={CTA.responsiveSettings}
                    basis={CTA.settings.basis}
                    typography={CTA.settings.typography}
                    border={CTA.settings.border}
                    icon={CTA.settings.icon}
                    href={data.slug && !CTA.settings.state.disabled ? `/${data.category[0].slug}/${data.slug}` : ''}
                    target={CTA.settings.state.external ? '_blank' : ''}
                    className={CTA.settings.state.disabled ? 'disabled' : ''}
                    onClick={(e) => {
                        if (CTA.settings.state.disabled) e.preventDefault();
                    }}
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
