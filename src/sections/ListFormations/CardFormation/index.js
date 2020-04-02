import React, {Component} from 'react';
import {
   Formation, ImageContainer, RightContent, ImageBackground

} from './styled';
import { TextCommon } from '../../../styles/common.styled'
import { fileNameFromUrl } from '../../../utils/functions'

class CardFormation extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const {data, i, assetsDirectory, config, configCard} = this.props;

        console.log('PROPS ON CARDFORMATION', this.props)

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



            <RightContent>
                <TextCommon
                    key={i}
                    responsive={config.responsiveSettings}
                    typography={config.settings.category}
                    basis={config.settings.category}
                    border={null}
                    as={'p'}
                >
                    { data.category.name }
                </TextCommon>


            </RightContent>




        </Formation>;
    }
}

CardFormation.propTypes = {};

export default CardFormation;


/*


            <ImageContainer key={i}
                            responsive={config.responsiveSettings}
                            basis={config.settings.image}>
                <img alt={data.name} src={`${assetsDirectory || ''}${ fileNameFromUrl(data.image.file.url) }`}/>
            </ImageContainer>


 */