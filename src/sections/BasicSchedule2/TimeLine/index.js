import React from 'react';
import { DashContainer, Dash } from "../styled";

export const getHoursTimeLine = (start, end) => {
    const hourStart = Number((start.split(' ')[1]).split(':')[0]);
    const minutesStart = Number((start.split(' ')[1]).split(':')[1]);
    const hourEnd = Number((end.split(' ')[1]).split(':')[0]);
    const minutesEnd = Number((end.split(' ')[1]).split(':')[1]);
    let rows = [];


    if (minutesStart !== 0) {
        rows.push(
            <DashContainer>
                {
                    Array.from(Array((Math.ceil(minutesStart / 15))), (e, i) => {
                        return <Dash/>
                    })
                }
            </DashContainer>);

        for (let i = (hourStart + 1); i <= (hourEnd - 1); i++) {
            rows.push(
                <DashContainer>
                    <p>{i}</p>
                    <Dash/>
                    <Dash/>
                    <Dash/>
                    <Dash/>
                </DashContainer>);
        }
    } else {
        for (let i = (hourStart); i <= (hourEnd - 1); i++) {
            rows.push(
                <DashContainer>
                    <p>{i}</p>
                    <Dash/>
                    <Dash/>
                    <Dash/>
                    <Dash/>
                </DashContainer>);
        }
    }
    if (minutesEnd !== 0) {

        rows.push(
            <DashContainer>
                <p>{hourEnd}</p>
                {
                    Array.from(Array((Math.ceil(minutesEnd / 15))), (e, i) => {
                        return <Dash/>
                    })
                }
            </DashContainer>);
    }

    return rows;
}


