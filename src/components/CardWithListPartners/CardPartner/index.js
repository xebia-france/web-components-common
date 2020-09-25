import React, {Component} from 'react';
import {
   Partner, ImageContainer

} from './styled';
import { fileNameFromUrl } from '../../../utils/functions'
import {generatePictureWebP} from "../../../utils/gettersCommonElement";

class CardPartner extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const {partner, i, assetsDirectory, config, configCard} = this.props;

        const Settings = configCard && configCard.settings ? configCard.settings : null;
        const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];
        if(!partner) return null
        return <Partner
            responsive={Responsive}
            responsiveContent={configCard.responsiveContent}
            basis={Settings ? Settings.basis : {}}
            border={Settings ? Settings.border : {}}
        >
            <ImageContainer key={i}
                            as={'a'}
                            href={partner.link ? partner.link : ''}
                            disabled={!partner.link || partner.link === ''}
                            rel={'noopener'}
                            target={'_blank'}
                            responsive={config.responsiveSettings}
                            basis={config.settings.logo}>
                { generatePictureWebP(`${assetsDirectory || ''}${ fileNameFromUrl(partner.logo.file.url) }`,partner.name )}
            </ImageContainer>
        </Partner>;
    }
}

CardPartner.propTypes = {};

export default CardPartner;
