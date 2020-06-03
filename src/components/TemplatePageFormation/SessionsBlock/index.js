import React, {Component} from 'react';
import {Container, ListSession} from './styled';
import { Content} from "../styled";
import {getTextProps, getTemplateProps} from "../../../utils/gettersProperties";
import {TextCommon} from "../../../styles/common.styled";
import ItemSession from '../ItemSession';
import InsertBlock from '../InsertBlock';

class SessionsBlock extends Component {

    renderPricing = (type, price, settings) => {
        const html = `<p>${type} : <strong>${ price }</strong></p>`
        return <Content {...this.props.getContentProps(settings)}
                        dangerouslySetInnerHTML={{
                            __html: html
                        }}
        />
    }
    render() {
        const { sessions, settingsSession, settingsPromo} = this.props;


        if(!sessions) return null;
        return (
            <Container>
                <InsertBlock settings={settingsSession} text={'Durée'}>
                    <TextCommon {...getTextProps(settingsSession.Content)}>
                        {sessions.duration || ''}
                    </TextCommon>
                </InsertBlock>

                <InsertBlock settings={settingsSession} text={'Tarif HT'}>
                        {
                            !sessions.pricing.inter || !sessions.pricing.inter.available ? null : this.renderPricing('inter', sessions.pricing.inter.price, settingsSession)
                        }
                        {
                            !sessions.pricing.intra || !sessions.pricing.intra.available ? null : this.renderPricing('intra', sessions.pricing.intra.price, settingsSession)
                        }
                </InsertBlock>
                {
                    sessions.schedule.length !== 0 ?
                        <InsertBlock settings={settingsSession} text={'Prochaines dates'}>
                            <ListSession>
                                {
                                    sessions.schedule.map(session => {
                                        return <ItemSession session={session} settingsSession={settingsSession}
                                                            settingsPromo={settingsPromo}
                                                            price={sessions.pricing.inter ? sessions.pricing.inter.price : ''}/>
                                    })
                                }
                            </ListSession>
                        </InsertBlock>

                        : null
                }



            </Container>

        )

    }
};

SessionsBlock.propTypes = {};

export default SessionsBlock;
