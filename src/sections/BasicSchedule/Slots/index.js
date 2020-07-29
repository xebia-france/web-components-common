import React, {Component} from 'react';
import {SlotContent, Slot, Header, Tag, Time, Clock, Informations} from "../styled";
import SvgClock from '../../../assets/svg/SvgClock';
import {getDuration, getHourFromTime, getBasisByType, getTextSettingsByType, getTitleSettingsByType} from "../utils";

export const overlaped = (slot, transverse) => {
    const startSlot = new Date(slot.fromTime);
    const endSlot = new Date(slot.toTime);
    const startTransverse = new Date(transverse.fromTime);
    const endTransverse = new Date(transverse.toTime);

    if ((startSlot >= startTransverse && startSlot < endTransverse) || (endSlot > startTransverse && endSlot <= endTransverse)) {
        return true
    } else {
        return false
    }


}

export const searchOverlap = (slot, transverses) => {
    let nbrOverlap = 0;
    transverses.forEach(transverse => {
        if (overlaped(slot, transverse)) {
            nbrOverlap++
        }
    })
    return nbrOverlap !== 0 ? true : false
}


class Slots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwiping: false,
            xStart : null,
            xEnd : null
        };

    }

    render() {

        const {scheduleOfDay, slots, transverses, openPopUp, filter, fieldSettings} = this.props;
        const all = !slots ? transverses : slots.concat(transverses);

        return all.map(slot => {

            const startDay = scheduleOfDay.startTime;


            return <Slot duration={getDuration(slot.fromTime, slot.toTime)}
                         minutes={getDuration(startDay, slot.fromTime)}
                         className={[!slot.room ? 'other' : '', slot.room && searchOverlap(slot, transverses) ? 'overlaped' : '', filter && filter !== slot.type ? 'filtered' : '' ]}
                         responsive={fieldSettings.responsiveSettings}
                         basis={getBasisByType(slot.type, fieldSettings.settings)}
                         onMouseDown={(e) => {
                             this.setState({
                                 xStart : e.clientX
                             })
                             console.log('MOUSE DOWN')
                             console.log('MOUSE DOWN e', e)
                             console.log('X', e.clientX)
                         }}
                         onMouseUp={e => {
                             console.log('MOUSE UP')
                             console.log('MOUSE UP e', e)
                             console.log('X', e.clientX)

                             this.setState({
                                 xEnd : e.clientX
                             }, () => {
                                 if(this.state.xStart === this.state.xEnd){
                                     openPopUp(slot)
                                 }
                                 this.setState({
                                     xStart : null,
                                     xEnd : null
                                 })

                             })

                         }}
                /*onTouchStart={(e) => {
                    console.log('ON TOUCH START',e.touches[0].clientX)
                    this.setState({
                        xStart : e.touches[0].clientX
                    })
                }}
                onTouchEnd={e => {
                    console.log('ON TOUCH END', e.touches[0].clientX)
                    this.setState({
                        xEnd :e.touches[0].clientX
                    }, () => {
                        if(this.state.xStart === this.state.xEnd){
                            openPopUp(slot)
                        }
                        this.setState({
                            xStart : null,
                            xEnd : null
                        })

                    })
                }}*/
            >
                <SlotContent>
                    <Header>
                        <Tag  responsive={fieldSettings.responsiveSettings} typographyTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)}>
                            {slot.type ? <div>{slot.type}</div> : null}
                            {slot.track ? <div>{slot.track}</div> : null}
                        </Tag>
                        <Time responsive={fieldSettings.responsiveSettings} typographyTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)} basisTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)}>
                            <Clock><SvgClock/></Clock>
                            {getHourFromTime(slot.fromTime)} - {getHourFromTime(slot.toTime)}
                        </Time>
                    </Header>
                    <Informations responsive={fieldSettings.responsiveSettings} typographyTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)} basisTitle={getTitleSettingsByType(slot.type, fieldSettings.settings)} typographyText={getTextSettingsByType(slot.type, fieldSettings.settings)} basisText={getTextSettingsByType(slot.type, fieldSettings.settings)} >
                        <h4 className={getDuration(slot.fromTime, slot.toTime) <= 30 ? 'cropped' : ''}>{slot.title}</h4>
                        {
                            slot.speakers && slot.speakers.length !== 0 && getDuration(slot.fromTime, slot.toTime) >= 30 ?
                                <h5>{slot.speakers.map((speaker) => speaker.name).join(', ')}</h5>
                                : null
                        }

                    </Informations>
                </SlotContent>
            </Slot>
        })
    }

};

export default Slots;
