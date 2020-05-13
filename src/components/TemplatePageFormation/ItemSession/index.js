import React, {Component} from 'react';
import {Container, Contain, IconContainer, ContainerPromo} from './styled';
import {TextCommon, ContainerCommon} from "../../../styles/common.styled";
import SvgElearning from '../../../assets/svg/SvgElearning';
import {getTextProps, getTemplateProps} from "../../../utils/gettersProperties";

class ItemSession extends Component {

    getStringDays = () => {
        const {startTime, endTime} = this.props.session
        const optionsComplete = {/*weekday: 'long', year: 'numeric',*/ month: 'long', day: 'numeric'};
        const optionsOnlyDay = {/*weekday: 'long', year: 'numeric',* month: 'long',*/ day: 'numeric'};
        const startDay = new Date(startTime);
        const endDay = new Date(endTime);

        if (startDay.getMonth() === endDay.getMonth()) {
            return `${startDay.toLocaleDateString('fr-FR', optionsOnlyDay)} - ${endDay.toLocaleDateString('fr-FR', optionsComplete)} `
        } else {
            return `${startDay.toLocaleDateString('fr-FR', optionsComplete)} - ${endDay.toLocaleDateString('fr-FR', optionsComplete)} `
        }
    }

    render() {
        const {session, settingsSession, settingsPromo, price} = this.props;

        if (session.promo.available) {
            return (
                <ContainerPromo {...getTemplateProps(settingsPromo.Template)} >
                    <Contain>
                        <TextCommon {...getTextProps(settingsPromo.Title)} >
                            {this.getStringDays()}
                            {
                                session.type !== 'a_distance' ? null :
                                    <IconContainer
                                        responsive={settingsPromo.Title ? settingsPromo.Title.responsiveSettings : []}
                                        typography={settingsPromo.Title && settingsPromo.Title.settings ? settingsPromo.Title.settings.typography : null}>
                                        <SvgElearning/>
                                    </IconContainer>
                            }

                        </TextCommon>
                        <TextCommon {...getTextProps(settingsPromo.Tagline)} >{`${ session.promo.price } au lieu ${ price }`}</TextCommon>
                    </Contain>

                </ContainerPromo>
            )
        } else {
            return (
                <Container {...getTemplateProps(settingsSession.Template)}
                >
                    <Contain>
                        <TextCommon {...getTextProps(settingsSession.Content)} >
                            {this.getStringDays()}
                            {
                                session.type !== 'a_distance' ? null :
                                    <IconContainer
                                        responsive={settingsSession.Content ? settingsSession.Content.responsiveSettings : []}
                                        typography={settingsSession.Content && settingsSession.Content.settings ? settingsSession.Content.settings.typography : null}>
                                        <SvgElearning/>
                                    </IconContainer>
                            }

                        </TextCommon>
                    </Contain>
                </Container>
            );
        }
    }
}

ItemSession.propTypes = {};

export default ItemSession;
