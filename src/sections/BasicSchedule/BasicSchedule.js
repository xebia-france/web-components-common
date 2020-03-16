import React, {Component} from 'react';
import {
    Wrapper,
    Container,
    Test,
    Schedule,
    HoursLine,
    Dash,
    Head,
    Column,
    Days,
    Day,
    BodySchedule,
    HeadSchedule,
    Label,
    Slots,
    Slot,
    SlotContent,
    DashContainer,
    Informations, Header, Tag, Time, Clock
} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import SwipeableViews from 'react-swipeable-views';
import SvgClock from '../../assets/svg/SvgClock';


class BasicSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: this.initStartTime(),
            endTime: this.initEndTime(),
            rooms: [],
            formatedSchedule: this.formatSchedule(),
            scheduleOfDay: this.formatSchedule()[0],
            currentDay: this.formatSchedule()[0].date,
            days: []
        };
    }


    initStartTime = () => {
        const min = this.props.schedule.reduce((prev, current) => {
            return (this.getHourFromTime(prev.fromTime)) < (this.getHourFromTime(current.fromTime)) ? prev : current
        })
        return Number(this.getHourFromTime(min.fromTime).slice(0, -3));
    }

    initEndTime = () => {
        const max = this.props.schedule.reduce((prev, current) => {
            return (this.getHourFromTime(prev.toTime)) > (this.getHourFromTime(current.toTime)) ? prev : current
        })
        console.log('MAX', max)
        console.log('INIT NED TIME', Number(this.getHourFromTime(max.toTime).slice(0, -3)))
        return Number(this.getHourFromTime(max.toTime).slice(0, -3))
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

            //min

            const min = slotsOfDay.reduce((prev, current) => {
                return (this.getHourFromTime(prev.fromTime)) < (this.getHourFromTime(current.fromTime)) ? prev : current
            })
            item.startTime = min.fromTime;

            const max = slotsOfDay.reduce((prev, current) => {
                return (this.getHourFromTime(prev.toTime)) > (this.getHourFromTime(current.toTime)) ? prev : current
            })
            item.endTime = max.toTime;

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
        console.log('SCHEDULE INIT', schedule)
        return schedule;

    }


    componentDidMount() {


    }

    getHourFromTime = (time) => time.split(' ')[1];
    getDayFromTime = (time) => time.split(' ')[0];

    getHoursTimeLine = (start, end) => {
        const hourStart = Number((start.split(' ')[1]).split(':')[0]);
        const minutesStart = Number((start.split(' ')[1]).split(':')[1]);
        const hourEnd = Number((end.split(' ')[1]).split(':')[0]);
        let rows = [];

        if (minutesStart !== 0) {
            console.log('divide', (minutesStart / 15));

            rows.push(
                <DashContainer>
                    {
                        Array.from(Array((minutesStart / 15)), (e, i) => {
                            return <Dash/>
                        })
                    }
                </DashContainer>);

            for (let i = (hourStart + 1); i <= hourEnd; i++) {
                rows.push(
                    <DashContainer>
                        <p>{i}</p>
                        <Dash/>
                        <Dash/>
                        <Dash/>
                        <Dash/>
                    </DashContainer>);
            }
        }else{
            for (let i = (hourStart); i <= hourEnd; i++) {
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

        return rows;
    }

    getDuration = (start, end) => {
        const startTime = new Date(start);
        const endTime = new Date(end);
        const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
        return Math.round(difference / 60000);
    }

    getScheduleOfDay = () => {
        const scheduleOfDay = this.state.formatedSchedule.find(day => day.date === this.state.currentDay);
        console.log('SCHEDULE OF DAY', scheduleOfDay);
        return scheduleOfDay;
    }
    getSlots = (slots, notTalk = false) => {
        console.log(slots)
        return slots.map(slot => {

            const startDay = this.getScheduleOfDay().startTime
            return <Slot duration={this.getDuration(slot.fromTime, slot.toTime)} minutes={this.getDuration(startDay, slot.fromTime)} className={notTalk ? 'other' : ''}>
                <SlotContent>
                    <Header>
                        <Tag>
                            { slot.type ? <div>{ slot.type }</div> : null }
                            { slot.track ? <div>{ slot.track }</div> : null }
                        </Tag>
                        <Time>
                            <Clock><SvgClock/></Clock>
                            {this.getHourFromTime(slot.fromTime)} - {this.getHourFromTime(slot.toTime)}
                        </Time>
                    </Header>
                    <Informations>
                        <h4>{slot.title}</h4>
                    </Informations>
                </SlotContent>
            </Slot>
        })
    }


    render() {
        const {children, fields, name, assetsDirectory, schedule} = this.props;

        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;

        const styles = {
            root: {
                width: '100%',
                padding: '0 50% 0 0',
            },
            slideContainer: {
                padding: '0px 0px',
                overflow: 'visible'
            },
            slide: {
                padding: 0,
                minHeight: 100,
                color: '#fff'

            },
            slide1: {
                backgroundColor: 'none'
            },
            slide2: {
                backgroundColor: 'none'
            },
            slide3: {

                backgroundColor: 'none'
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
            >
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                    <Schedule>
                        <HeadSchedule>
                            <Label><p>DAY</p></Label>
                            <Days>
                                {
                                    this.formatSchedule().map(day => {
                                        return <Day className={day.date === this.state.currentDay ? 'active' : ''}
                                                    onClick={() => {
                                                        this.setState({
                                                            currentDay: day.date
                                                        })
                                                    }}>{day.date}</Day>
                                    })
                                }
                            </Days>
                        </HeadSchedule>
                        <BodySchedule>
                            <HoursLine>
                                <Label><p>ROOM</p></Label>

                                {this.getHoursTimeLine(this.getScheduleOfDay().startTime, this.getScheduleOfDay().endTime)}
                            </HoursLine>
                            <SwipeableViews enableMouseEvents disableLazyLoading style={styles.root}
                                            slideStyle={styles.slideContainer}>
                                {

                                    this.getScheduleOfDay() ? this.getScheduleOfDay().rooms.map(room => {
                                        return (
                                            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                                                <Head>{room.name}</Head>
                                                <Slots>
                                                    {this.getSlots(room.slots)}
                                                    {this.getSlots(this.getScheduleOfDay().others, true)}
                                                </Slots>
                                            </Column>
                                        )
                                    }) : null
                                }
                                <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                                    <Head>Room Test</Head>
                                </Column>
                            </SwipeableViews>
                        </BodySchedule>
                    </Schedule>
                </Container>
            </Wrapper>
        );
    }

};

BasicSchedule.defaultProps = {}

export default BasicSchedule;

/*

<div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
<div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
<div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
<div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
<div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
<div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
<div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
<div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
<div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>

 */