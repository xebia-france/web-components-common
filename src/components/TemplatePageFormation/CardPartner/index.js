import React, {Component} from 'react';
import { Text, Content } from '../styled'
import {Container, Left, Right} from './styled';
import {fileNameFromUrl} from "../../../utils/functions";
import {ImageContainerCommon} from "../../../styles/common.styled";
import { getTextProps} from "../../../utils/gettersProperties";

class CardPartner extends Component {
    render() {
        const {partner, settings, assetsDirectory} = this.props;
        const imageFileName = fileNameFromUrl(partner.logo.file.url)

        return <Container>
            <Left>
                <ImageContainerCommon
                                responsive={settings.Image.responsiveSettings}
                                basis={settings.Image.settings.basis}
                                border={settings.Image.settings.border}>
                    <img alt={`${partner.name}`} src={`${assetsDirectory || ''}${ imageFileName }`}/>
                </ImageContainerCommon>
            </Left>
            <Right>
                <Text {...getTextProps(settings.Title)}>
                    {`${partner.name}`}
                </Text>
                <Content {...this.props.getContentProps(settings)}
                         dangerouslySetInnerHTML={{
                             __html: partner.presentation && partner.presentation.childMarkdownRemark ?
                                 partner.presentation.childMarkdownRemark.html
                                 : <p></p>
                         }}
                />
            </Right>
        </Container>;
    }
}

CardPartner.propTypes = {};

export default CardPartner;
