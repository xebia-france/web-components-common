import React from 'react';
import {
    PopUpContainer,
    Card,
    Banner,
    Room,
    Close,
    Day,
    Content,
    Time,
    Duration,
    Clock,
    InfoTime,
    Info,
    Summary,
    Speaker, Image, InfoSpeakers
} from "./styled";
import {getDayFromTime, getHourFromTime, getDuration,getStringDate} from "../utils";
import SvgClock from '../../../assets/svg/SvgClock';
import {Tag} from '../styled'



const PopUp = ({open, closePopUp, slot, allSpeakers, assetsDirectory, locale}) => {
    if (!slot || !allSpeakers) return null
    return (<PopUpContainer className={open ? 'open' : ''}>
            <Card>
                <Banner>
                    <Day>{getStringDate(slot.fromTime, locale) }</Day>
                    <Room>{slot.room || ''}</Room>
                    <Close onClick={() => {
                        closePopUp()
                    }}>
                        <div></div>
                        <div></div>
                    </Close>
                </Banner>
                <Content>
                    <InfoTime>

                        <Time>{`${getHourFromTime(slot.fromTime)}-${getHourFromTime(slot.toTime)}`}</Time>
                        <Duration>
                            <Clock><SvgClock/></Clock>
                            {`${getDuration(slot.fromTime, slot.toTime)} min`}
                        </Duration>
                    </InfoTime>
                    <Info>
                        <h4>{slot.title}</h4>
                        <Tag>
                            {slot.type ? <div>{slot.type}</div> : null}
                            {slot.track ? <div>{slot.track}</div> : null}
                        </Tag>
                        <Summary dangerouslySetInnerHTML={{__html: slot.summary}}></Summary>
                    </Info>

                    {
                        slot.speakers && slot.speakers.length !== 0 ?
                            <InfoSpeakers>
                                {
                                    slot.speakers.map(s => {
                                        console.log('allSpeakers :', allSpeakers)
                                        let match = allSpeakers.find(i => i.id === s.id);
                                        console.log('id :', s.id)
                                        console.log('match :', match)
                                        if (!match) return null;
                                        return <Speaker>
                                            <Image assetsDirectory={assetsDirectory} asset={match.imageURL}/>
                                            <div>
                                                <h4>{match.firstName} <span>{match.lastName}</span></h4>
                                            </div>
                                        </Speaker>
                                    })
                                }

                            </InfoSpeakers>
                            : null
                    }
                </Content>

            </Card>
        </PopUpContainer>
    )

};

export default PopUp;
