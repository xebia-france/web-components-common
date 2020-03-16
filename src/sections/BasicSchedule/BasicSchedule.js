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
    Informations,
    Others, OthersContent, Header, Tag, Time, Clock
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
                rooms: [],
                others: []
            })
        })

        schedule.forEach(item => {
            const slotsOfDay = this.props.schedule.map(slot => {
                return this.getDayFromTime(slot.fromTime) === item.date ? slot : null
            }).filter(el => el);

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

    getHoursTimeLine = (min, max) => {
        let rows = [];
        for (let i = min; i <= max; i++) {
            rows.push(
                <DashContainer>
                    <p>{i}</p>
                    <Dash/>
                    <Dash/>
                    <Dash/>
                </DashContainer>);
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
    getSlots = (slots) => {
        console.log(slots)
        return slots.map(slot => {

            console.log('DURATION', this.getDuration(slot.fromTime, slot.toTime));

            console.log('this.state.startTime', this.state.startTime);

            const slotStart = this.getHourFromTime(slot.fromTime);
            const hours = Number(slotStart.split(':')[0])
            const minutes = Number(slotStart.split(':')[1])
            console.log('SLOTSTART', slotStart)
            console.log('SLOTSTART 2', slotStart.split(':'))

            return <Slot duration={this.getDuration(slot.fromTime, slot.toTime)} hours={(hours - this.state.startTime)}
                         minutes={minutes}>
                <SlotContent>
                    <Header>
                        <Tag>
                            <div>Talk</div>
                            <div>Kotlin</div>
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
    getOthers = (slots) => {
        console.log(slots)
        return slots.map(slot => {

            console.log('SLOT INFO', slot);

            const slotStart = this.getHourFromTime(slot.fromTime);
            const hours = Number(slotStart.split(':')[0])
            const minutes = Number(slotStart.split(':')[1])

            return <Others duration={this.getDuration(slot.fromTime, slot.toTime)}
                           hours={(hours - this.state.startTime)} minutes={minutes}>
                <OthersContent>
                    <Header>
                        <Tag>
                            <div>Talk</div>
                            <div>Kotlin</div>
                        </Tag>
                        <Time>
                            <Clock><SvgClock/></Clock>
                            {this.getHourFromTime(slot.fromTime)} - {this.getHourFromTime(slot.toTime)}
                        </Time>
                    </Header>
                    <Informations>
                        <h4>{slot.title}</h4>
                    </Informations>
                </OthersContent>
            </Others>
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
                backgroundColor: '#FEA900'
            },
            slide2: {
                backgroundColor: '#B3DC4A'
            },
            slide3: {
                backgroundColor: '#6AC0FF'
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
                                {this.getHoursTimeLine(this.state.startTime, this.state.endTime)}
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
                                                    {this.getOthers(this.getScheduleOfDay().others)}
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

BasicSchedule.defaultProps = {
    fields: {
        Template: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                basis: {
                    A: {
                        padding: {
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0'
                        },
                        color: {
                            hex: '#000000',
                            rgb: '0,0,0',
                            name: 'black',
                            shade: null
                        },
                        opacity: {
                            value: '1'
                        }
                    }
                }

            }
        },
        FlexContainer: {
            content: {},
            responsiveSettings: ['A'],
            settings: {
                flex: {
                    A: {
                        properties: {
                            columns: '1',
                            gutterHorizontal: '0',
                            gutterVertical: '0',
                            direction: 'row',
                            wrap: 'wrap',
                            justify: 'flex-start',
                            alignItems: 'flex-start',
                            alignContent: 'flex-start'
                        }
                    }
                }
            }


        }

    }
}

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