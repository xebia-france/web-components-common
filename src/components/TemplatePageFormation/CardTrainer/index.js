import React, {Component} from 'react';
import { Text, Content } from '../styled'
import {Container, Left, Right} from './styled';
import {fileNameFromUrl} from "../../../utils/functions";
import {ImageContainerCommon} from "../../../styles/common.styled";
import { getTextProps} from "../../../utils/gettersProperties";

class CardTrainer extends Component {
    render() {
        const {trainer, settings, assetsDirectory} = this.props;
        const imageFileName = fileNameFromUrl(trainer.photo.file.url)

        return <Container>
            <Left>
                <ImageContainerCommon
                                responsive={settings.Image.responsiveSettings}
                                basis={settings.Image.settings.basis}
                                border={settings.Image.settings.border}>
                    <img alt={`${trainer.firstname} ${trainer.lastname}`} src={`${assetsDirectory || ''}${ imageFileName }`}/>
                </ImageContainerCommon>
            </Left>
            <Right>
                <Text {...getTextProps(settings.Title)}>
                    {`${trainer.firstname} ${trainer.lastname}`}
                </Text>
                <Content {...this.props.getContentProps(settings)}
                         dangerouslySetInnerHTML={{
                             __html: trainer.biography && trainer.biography.childMarkdownRemark ?
                                 trainer.biography.childMarkdownRemark.html
                                 : <p></p>
                         }}
                />
            </Right>
        </Container>;
    }
}

CardTrainer.propTypes = {};

export default CardTrainer;
