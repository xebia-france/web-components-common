import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import { Wrapper, Container, ShadowRight, ShadowLeft, HoursLine, Informations, SlotContent, Slot, Column, Dash, Clock, Time, Tag, Header, Label, HeadSchedule, BodySchedule, DashContainer, Day, Days, Head, Schedule, Slots} from "./styled";
import SvgClock from '../../assets/svg/SvgClock';

class BasicSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formatedSchedule: this.formatSchedule(),
            scheduleOfDay: this.formatSchedule()[0],
            currentDay: this.formatSchedule()[0].date,
            nbrColumn: 5, //this.formatSchedule()[0].rooms.length,
            index : 0
        };
    }

    formatSchedule = () => {
        const schedule = [];

        const days = this.props.schedule.map(slot => {
            return this.getDayFromTime(slot.fromTime);
        })
        const daysUnique = [...new Set(days)];

        daysUnique.forEach(day => {
            schedule.push({
                date: day,
                startTime: '',
                endTime: '',
                rooms: [],
                others: []
            })
        })

        schedule.forEach(item => {
            const slotsOfDay = this.props.schedule.map(slot => {
                return this.getDayFromTime(slot.fromTime) === item.date ? slot : null
            }).filter(el => el);

            const min = slotsOfDay.reduce((prev, current) => {
                return (this.getHourFromTime(prev.fromTime)) < (this.getHourFromTime(current.fromTime)) ? prev : current
            })
            item.startTime = this.lowerRoundTimeQuarter(min.fromTime);

            const max = slotsOfDay.reduce((prev, current) => {
                return (this.getHourFromTime(prev.toTime)) > (this.getHourFromTime(current.toTime)) ? prev : current
            })
            item.endTime = this.upperRoundTimeQuarter(max.toTime);

            const rooms = slotsOfDay.map((item) => {
                return item.room ? item.room : null
            })

            let roomUnique = [...new Set(rooms)];
            Object.assign(item.rooms, roomUnique.filter(el => el).map(el => {
                const room = {
                    name: el,
                    slots: []
                }
                return room;
            }))

            item.rooms.forEach(room => {
                const slots = slotsOfDay.map((item) => {
                    return (item.room === room.name ? item : null)
                }).filter(el => el)
                Object.assign(room.slots, slots)
            })

            const others = slotsOfDay.map((item) => {
                return (!item.room ? item : null)
            }).filter(el => el)
            Object.assign(item.others, others)


        })
        return schedule;

    }
    getHourFromTime = (time) => time.split(' ')[1];
    getDayFromTime = (time) => time.split(' ')[0];

    getHoursTimeLine = (start, end) => {
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
            for (let i = (hourStart); i <= (hourEnd - 1) ; i++) {
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

    getDuration = (start, end) => {
        const startTime = new Date(start.replace(/ /g,"T"));
        const endTime = new Date(end.replace(/ /g,"T"));
        const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
        return Math.round(difference / 60000);
    }

    getScheduleOfDay = () => this.state.formatedSchedule.find(day => day.date === this.state.currentDay);


    upperRoundTimeQuarter = (time) => {
        var minutes = Number((time.split(' ')[1]).split(':')[1]);
        var m = ((Math.ceil(minutes / 15)) * 15) % 60;
        return time.slice(0, -2) + String(m);
    }

    lowerRoundTimeQuarter = (time) => {
        var minutes = Number((time.split(' ')[1]).split(':')[1]);
        var m = (Math.floor(minutes / 15) * 15) % 60;
        return time.slice(0, -2) + String(m);
    }

    renderSlots = (slots, transverses) => {
        return slots.concat(transverses).map(slot => {

            const startDay = this.state.scheduleOfDay.startTime;


            return <Slot duration={this.getDuration(slot.fromTime, slot.toTime)}
                         minutes={this.getDuration(startDay, slot.fromTime)} className={!slot.room ? 'other' : ''}>
                <SlotContent>
                    <Header>
                        <Tag>
                            {slot.type ? <div>{slot.type}</div> : null}
                            {slot.track ? <div>{slot.track}</div> : null}
                        </Tag>
                        <Time>
                            <Clock><SvgClock/></Clock>
                            {this.getHourFromTime(slot.fromTime)} - {this.getHourFromTime(slot.toTime)}
                        </Time>
                    </Header>
                    <Informations>
                        <h4 className={this.getDuration(slot.fromTime, slot.toTime) <= 30 ? 'cropped' : ''}>{slot.title}</h4>
                        {
                            slot.speakers && slot.speakers.length !== 0 && this.getDuration(slot.fromTime, slot.toTime) >= 30 ?
                                <h5>{slot.speakers.map((speaker) => speaker.name).join(', ')}</h5>
                                : null
                        }

                    </Informations>
                </SlotContent>
            </Slot>
        })
    }

    updateIndex = index => {
        this.setState({
            index,
        });
    };

    changeCurrentDay = (date) => {
        this.setState({
            currentDay: date,
            index : 0
        }, () => {
            const currentSchedule = this.getScheduleOfDay();
            this.setState({
                scheduleOfDay : currentSchedule,
               // nbrColumn : currentSchedule.rooms.length
            })
        })
    }


    render() {
        const {children, fields, name, assetsDirectory, schedule} = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;

        const styles = {
            root: {
                width: '100%',
                overflowX: 'visible',
                padding: '0 70% 0 0',
                marginLeft: '0%'
            },
            slideContainer: {
                padding: '0',
                width: '100%',
                overflow: 'visible'
            },
            slide: {},
            slide1: {
                backgroundColor: 'transparent',
            },
            slide2: {
                backgroundColor: '#transparent',
            },
            slide3: {
                backgroundColor: '#transparent',
            },
        };

        return (
            <Wrapper id={removeSpaces(name)}
                     asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                     responsive={Template ? Template.responsiveSettings : null}
                     basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            ><Container
                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                <div>Programme</div>
                <Schedule>
                    <HeadSchedule>
                        <Label><p>DAY</p></Label>
                        <Days>
                            {
                                this.formatSchedule().map(day => {
                                    return <Day className={day.date === this.state.currentDay ? 'active' : ''}
                                                onClick={() => this.changeCurrentDay(day.date)}>{day.date}</Day>
                                })
                            }
                        </Days>
                    </HeadSchedule>
                    <BodySchedule responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                                  nbrColumn={this.state.nbrColumn} index={this.state.index}>
                        <HoursLine>
                            <Label><p>ROOM</p></Label>

                            {this.getHoursTimeLine(this.state.scheduleOfDay.startTime, this.state.scheduleOfDay.endTime)}
                        </HoursLine>
                        <SwipeableViews
                            index={this.state.index} onChangeIndex={this.updateIndex}
                            resistance enableMouseEvents disableLazyLoading style={styles.root}
                            slideStyle={styles.slideContainer}>
                            {

                                this.state.scheduleOfDay ? this.state.scheduleOfDay.rooms.map(room => {
                                    return (
                                        <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                                            <Head>{room.name}</Head>
                                            <Slots>
                                                {this.renderSlots(room.slots, this.state.scheduleOfDay.others)}
                                            </Slots>
                                        </Column>
                                    )
                                }) : null
                            }
                            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                                <Head>Test 1</Head>
                                <Slots>
                                    {this.renderSlots(this.state.scheduleOfDay.rooms[0].slots, this.state.scheduleOfDay.others)}
                                </Slots>
                            </Column>
                            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                                <Head>Test 2</Head>
                                <Slots>
                                    {this.renderSlots(this.state.scheduleOfDay.rooms[0].slots, this.state.scheduleOfDay.others)}
                                </Slots>
                            </Column>
                            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                                <Head>Test 3</Head>
                                <Slots>
                                    {this.renderSlots(this.state.scheduleOfDay.rooms[0].slots, this.state.scheduleOfDay.others)}
                                </Slots>
                            </Column>
                        </SwipeableViews>
                        <ShadowLeft/>
                        <ShadowRight/>
                    </BodySchedule>
                </Schedule>
            </Container>
            </Wrapper>

        )

    }
}

BasicSchedule.defaultProps = {}
export default BasicSchedule;
