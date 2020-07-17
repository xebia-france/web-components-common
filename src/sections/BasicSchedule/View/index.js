import React from 'react';
import { Column, Head, SlotsContainer } from "../styled";
import Slots from '../Slots';

export const renderView = (scheduleOfDay, styles) => {
    console.log('scheduleOfDay BUG', scheduleOfDay)

    if (!scheduleOfDay.rooms || scheduleOfDay.rooms.length === 0) {

        return (
            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                <Head>{ 'no room' }</Head>
                <SlotsContainer>
                    <Slots scheduleOfDay={scheduleOfDay} slots={[]} transverses={scheduleOfDay.others} />
                </SlotsContainer>
            </Column>
        )

    }else{
        return scheduleOfDay.rooms.map(room => {
            return (
                <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                    <Head>{room.name}</Head>
                    <SlotsContainer>
                        <Slots scheduleOfDay={scheduleOfDay} slots={room.slots} transverses={scheduleOfDay.others} />
                    </SlotsContainer>
                </Column>
            )
        })
    }
};

