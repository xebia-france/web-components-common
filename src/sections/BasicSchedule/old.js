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
    Informations, Header, Tag, Time, Clock, ShadowLeft, ShadowRight
} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import SwipeableViews from 'react-swipeable-views';
import SvgClock from '../../assets/svg/SvgClock';


class BasicSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* startTime: this.initStartTime(),
             endTime: this.initEndTime(),
             rooms: [],
             formatedSchedule: this.formatSchedule(),
             scheduleOfDay: this.formatSchedule()[0],
             currentDay: this.formatSchedule()[0].date,
             days: [],
             index: 0,
             nbrColumn: 5*/
        };
    }

    componentDidMount(){

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

            const min = slotsOfDay.reduce((prev, current) => {
                return (this.getHourFromTime(prev.fromTime)) < (this.getHourFromTime(current.fromTime)) ? prev : current
            })
            item.startTime = this.roundTimeQuarterHour(min.fromTime);

            const max = slotsOfDay.reduce((prev, current) => {
                return (this.getHourFromTime(prev.toTime)) > (this.getHourFromTime(current.toTime)) ? prev : current
            })
            item.endTime = this.roundTimeQuarterHour(max.toTime);

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
        let rows = [];

        if (minutesStart !== 0) {
            // console.log('divide', Math.ceil(minutesStart / 15));

            rows.push(
                <DashContainer>
                    {
                        Array.from(Array((Math.ceil(minutesStart / 15))), (e, i) => {
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
        } else {
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
        // console.log('SCHEDULE OF DAY', scheduleOfDay);
        return scheduleOfDay;
    }

    roundTimeQuarterHour = (time) => {
        var minutes = Number((time.split(' ')[1]).split(':')[1]);
        var m = (Math.round(minutes / 15) * 15) % 60;
        return time.slice(0, -2) + String(m);
    }

    overlaped = (slot, transverse) => {
        //console.log('overlap SLOT', slot);
        //console.log('overlap TRANSVERSE', transverse);

        const startSlot = new Date(slot.fromTime);
        const endSlot = new Date(slot.toTime);
        const startTransverse = new Date(transverse.fromTime);
        const endTransverse = new Date(transverse.toTime);

        if ((startSlot >= startTransverse && startSlot < endTransverse) || (endSlot > startTransverse && endSlot <= endTransverse)) {
            //console.log('OVERLAP !!!!')
            return true
        } else {
            //console.log('NOT OVERLAPED');
            return false
        }


    }

    searchOverlap = (slots, transverse) => {
        let nbrOverlap = 0;
        slots.forEach(slot => {
            if (this.overlaped(slot, transverse)) {
                nbrOverlap++
            }
            //console.log('nbrOverlap', nbrOverlap);
        })
        return nbrOverlap !== 0 ? true : false
    }


    renderSlots = (slots, transverses) => {
        //console.log('renderSlots slots', slots)
        // console.log('renderSlots transverse', transverses)

        const filtered = transverses.length !== 0 ? transverses.filter((trans) => !this.searchOverlap(slots, trans)) : []
        //console.log('FILTERED', filtered)


        // return slots.concat(filtered).map(slot => {
        return slots.concat(transverses).map(slot => {

            const startDay = this.getScheduleOfDay().startTime;


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

    handleChange = (event, value) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = index => {
        console.log('handleChangeIndex index', index)
        this.setState({
            index,
        });
    };


    render() {
        const {children, fields, name, assetsDirectory, schedule} = this.props;
        const {index, nbrColumn} = this.state;

        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;

        const styles = {
            root: {
                width: '100%',
                padding: '0 20px',
                //marginLeft : '-50%'
                //padding: '0 50% 0 0',
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

        const stylesB = {
            root: {
                width: '100%',
                overflowX: 'visible',
                padding: '0 70% 0 0',
                marginLeft: '0%'
            },
            slideContainer: {
                padding: '0',
                width: '100%',
                overflow: 'visible',
                //overflow: 'visible'
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
            >
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                    <SwipeableViews
                        resistance enableMouseEvents disableLazyLoading style={stylesB.root}
                        slideStyle={styles.slideContainer}>

                        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
                        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
                        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
                        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
                    </SwipeableViews>
                </Container>
            </Wrapper>
        );
    }

};

BasicSchedule.defaultProps = {}

export default BasicSchedule;

/*



-----------------------------------

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
                        <BodySchedule responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                                      nbrColumn={nbrColumn} index={index}>
                            <HoursLine>
                                <Label><p>ROOM</p></Label>

                                {this.getHoursTimeLine(this.getScheduleOfDay().startTime, this.getScheduleOfDay().endTime)}
                            </HoursLine>
                            <SwipeableViews
                                index={index} onChangeIndex={this.handleChangeIndex}
                                onSwitching={(index, type) => {

                                    //console.log('index switch: ', index)
                                    //console.log('type switch: ', type)
                                }}
                                resistance enableMouseEvents disableLazyLoading style={stylesB.root}
                                slideStyle={styles.slideContainer}>
                                {

                                    this.getScheduleOfDay() ? this.getScheduleOfDay().rooms.map(room => {
                                        return (
                                            <Column style={Object.assign({}, stylesB.slide, stylesB.slide1)}>
                                                <Head>{room.name}</Head>
                                                <Slots>
                                                    {this.renderSlots(room.slots, this.getScheduleOfDay().others)}
                                                </Slots>
                                            </Column>
                                        )
                                    }) : null
                                }
                                <Column style={Object.assign({}, stylesB.slide, stylesB.slide1)}>
                                    <Head>Test 1</Head>
                                    <Slots>
                                        {this.renderSlots(this.getScheduleOfDay().rooms[0].slots, this.getScheduleOfDay().others)}
                                    </Slots>
                                </Column>
                                <Column style={Object.assign({}, stylesB.slide, stylesB.slide1)}>
                                    <Head>Test 2</Head>
                                    <Slots>
                                        {this.renderSlots(this.getScheduleOfDay().rooms[0].slots, this.getScheduleOfDay().others)}
                                    </Slots>
                                </Column>
                                <Column style={Object.assign({}, stylesB.slide, stylesB.slide1)}>
                                    <Head>Test 3</Head>
                                    <Slots>
                                        {this.renderSlots(this.getScheduleOfDay().rooms[0].slots, this.getScheduleOfDay().others)}
                                    </Slots>
                                </Column>
                            </SwipeableViews>
                            <ShadowLeft/>
                            <ShadowRight/>
                        </BodySchedule>
                    </Schedule>



--------------------------------------




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