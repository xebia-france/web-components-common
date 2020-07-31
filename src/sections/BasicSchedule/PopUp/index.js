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
import {getDayFromTime, getHourFromTime, getDuration, getStringDate, getTitleSettingsByType} from "../utils";
import SvgClock from '../../../assets/svg/SvgClock';
import {Tag} from '../styled'



const PopUp = ({open, closePopUp, openPopUp, slot, allSpeakers, assetsDirectory, locale, fieldSettings}) => {
    if (!slot || !allSpeakers) return null
    console.log('fieldSettings >>>>', fieldSettings)
    return (<PopUpContainer className={open ? 'open' : ''}  >
            <Card>
                <Banner>
                    <Day responsive={fieldSettings.responsiveSettings} basis={fieldSettings.settings.set1Bkg} t>{getStringDate(slot.fromTime, locale) }</Day>
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
                        <Time responsive={fieldSettings.responsiveSettings} basis={fieldSettings.settings.set1Bkg} typographyTitle={fieldSettings.settings.set1Title} >{`${getHourFromTime(slot.fromTime)}-${getHourFromTime(slot.toTime)}`}</Time>
                        <Duration>
                            <Clock><SvgClock/></Clock>
                            {`${getDuration(slot.fromTime, slot.toTime)} min`}
                        </Duration>
                    </InfoTime>
                    <Info responsive={fieldSettings.responsiveSettings} typographyTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)}>
                        <h4>{slot.title}</h4>
                        <Tag responsive={fieldSettings.responsiveSettings} typographyTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)}>
                            {slot.type ? <div>{slot.type}</div> : null}
                            {slot.track ? <div>{slot.track}</div> : null}
                        </Tag>
                        <Summary dangerouslySetInnerHTML={{__html: slot.summary}}></Summary>
                    </Info>

                    {
                        slot.speakers && slot.speakers.length !== 0 ?
                            <InfoSpeakers responsive={fieldSettings.responsiveSettings} typographyTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)}>
                                {
                                    slot.speakers.map(s => {
                                        let match = allSpeakers.find(i => i.id === s.id);

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
