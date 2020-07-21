import React from 'react';
import { Column, Head, SlotsContainer } from "../styled";
import Slots from '../Slots';

export const renderRooms = (scheduleOfDay, styles) => {
    if (!scheduleOfDay.rooms || scheduleOfDay.rooms.length === 0) {

        return (
            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                <Head>{ 'no room' }</Head>
            </Column>
        )

    }else{
        return scheduleOfDay.rooms.map(room => {
            return (
                <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                    <Head>{room.name}</Head>
                </Column>
            )
        })
    }
};

