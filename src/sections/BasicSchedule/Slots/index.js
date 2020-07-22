import React from 'react';
import { SlotContent, Slot, Header, Tag, Time, Clock, Informations } from "../styled";
import SvgClock from '../../../assets/svg/SvgClock';
import { getDuration, getHourFromTime} from "../utils";

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



function Slots({scheduleOfDay, slots, transverses, openPopUp, filter}) {
    const all = !slots ? transverses : slots.concat(transverses);

    return all.map(slot => {

        const startDay = scheduleOfDay.startTime;


        return <Slot duration={getDuration(slot.fromTime, slot.toTime)}
                     minutes={getDuration(startDay, slot.fromTime)}

                     className={[!slot.room ? 'other' : '', slot.room && searchOverlap(slot, transverses), filter && filter !== slot.type ? 'filtered' : '' ? 'overlaped' : '']}
                     onClick={ () => {
                         openPopUp(slot)
                         console.log('openPopUP SLOT')
                     }}
        >
            <SlotContent>
                <Header>
                    <Tag>
                        {slot.type ? <div>{slot.type}</div> : null}
                        {slot.track ? <div>{slot.track}</div> : null}
                    </Tag>
                    <Time>
                        <Clock><SvgClock/></Clock>
                        {getHourFromTime(slot.fromTime)} - {getHourFromTime(slot.toTime)}
                    </Time>
                </Header>
                <Informations>
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

};

export default Slots;
