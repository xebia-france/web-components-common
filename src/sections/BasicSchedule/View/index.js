import React from 'react';
import { Column, Head, SlotsContainer, Grid } from "../styled";
import Slots from '../Slots';
import { getHoursTimeLine} from "../TimeLine";

export const renderView = (scheduleOfDay, styles, openPopUp, filter, fieldSettings) => {


    if (!scheduleOfDay.rooms || scheduleOfDay.rooms.length === 0) {

        return (
            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                <Head responsive={fieldSettings.responsiveSettings}
                      typographyTitle={fieldSettings.settings.set1Title}>{'no room'}</Head>
                <SlotsContainer>
                    <Slots openPopUp={openPopUp} scheduleOfDay={scheduleOfDay} slots={[]}
                           transverses={scheduleOfDay.others} filter={filter} fieldSettings={fieldSettings}/>                </SlotsContainer>
                <Grid>
                    {getHoursTimeLine(scheduleOfDay.startTime, scheduleOfDay.endTime)}
                </Grid>
            </Column>
        )

    }else{
        return scheduleOfDay.rooms.map(room => {
            return (
                <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                    <Head responsive={fieldSettings.responsiveSettings}
                          typographyTitle={fieldSettings.settings.set1Title}>{room.name}</Head>
                    <SlotsContainer>
                        <Slots openPopUp={openPopUp} scheduleOfDay={scheduleOfDay} slots={room.slots}
                               transverses={scheduleOfDay.others} filter={filter} fieldSettings={fieldSettings}/>                    </SlotsContainer>
                    <Grid>
                        {getHoursTimeLine(scheduleOfDay.startTime, scheduleOfDay.endTime)}
                    </Grid>
                </Column>
            )
        })
    }
};

