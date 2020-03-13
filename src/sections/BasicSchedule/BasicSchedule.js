import React, {Component} from 'react';
import {Wrapper, Container, Test, Schedule, HoursLine, Dash, Head, Column, Days, Day, BodySchedule, HeadSchedule, Label} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import SwipeableViews from 'react-swipeable-views';


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
            days : []
        };
    }



    initStartTime = () => {
        const min = this.props.schedule.reduce((prev, current) => {
            return (this.getHourFromTime(prev.fromTime)) < (this.getHourFromTime(current.fromTime)) ? prev : current
        })
        return  Number(this.getHourFromTime(min.fromTime).slice(0, -3));
    }

    initEndTime = () => {
        const max = this.props.schedule.reduce((prev, current) => {
            return (this.getHourFromTime(prev.toTime)) > (this.getHourFromTime(current.toTime)) ? prev : current
        })
        return Number(this.getHourFromTime(max.toTime).slice(0, -3))
    }
    formatSchedule = () => {
        const schedule = [];

        const days = this.props.schedule.map(slot => {
            return this.getDayFromTime(slot.fromTime);
        })
        console.log('DAYS : ', [...new Set(days)]);

        [...new Set(days)].forEach(day => {
            schedule.push({
                date: day,
                rooms: []
            })
        })

        schedule.forEach(item => {
            const slotsOfDay = this.props.schedule.map(slot => {
                return this.getDayFromTime(slot.fromTime) === item.date ? slot : null
            }).filter(el => el);

            console.log('SLOT OF DAY', slotsOfDay);

            const rooms = slotsOfDay.map((item) => {
                return item.room ? item.room : null
            })

            let unique = [...new Set(rooms)];
            console.log('ROOMS', unique);


            Object.assign(item.rooms, unique.filter(el => el).map(el => {
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
                console.log("SLOTS", slots)
                Object.assign(room.slots, slots)
            })

            console.log('--------------------------->', slotsOfDay);
        })

        console.log('SCHEDULE INIT', schedule)

        return schedule;



        /*this.setState({
            days: [...new Set(days)],
            formatedSchedule: schedule,
            currentDay: schedule[0].date
        }, () => {
            console.log('STATE SHEDULE', this.state)

            console.log('NEW SCHEDULE : ', schedule);
            this.setState({
                formatedSchedule: schedule
            }, () => {
                console.log('STATE FORMATED', this.state)
            })
        }*/


    }


    componentDidMount() {
        //console.log('SCHEDULE : ', this.props.schedule);

       // console.log('Test : ', this.props.schedule[0])
       // console.log('Test : ', this.getHourFromTime(this.props.schedule[0].fromTime))

        /*const lastHour = Math.max.apply(Math, this.props.schedule.map((item) => {
            return this.getHourFromTime(item.toTime);
        }))

        const max = this.props.schedule.reduce((prev, current) => {
            return (this.getHourFromTime(prev.toTime)) > (this.getHourFromTime(current.toTime)) ? prev : current
        })
        const min = this.props.schedule.reduce((prev, current) => {
            return (this.getHourFromTime(prev.fromTime)) < (this.getHourFromTime(current.fromTime)) ? prev : current
        })*/

        /*const rooms = this.props.schedule.map((item) => {
            return item.room ? item.room : null
        })

        let unique = [...new Set(rooms)];
        console.log(unique);


        console.log('ROOMS', rooms);
        console.log('UNIQUE', unique.filter(el => el));
        this.setState({
            //startTime: Number(this.getHourFromTime(min.fromTime).slice(0, -3)),
           // endTime: Number(this.getHourFromTime(max.toTime).slice(0, -3)),
            //rooms: unique.filter(el => el)
        }, () => {
            console.log('STATE', this.state);

        })

        const days = this.props.schedule.map(slot => {
            return this.getDayFromTime(slot.fromTime);
        })
        console.log('DAYS : ', [...new Set(days)]);

        const schedule = [];
        [...new Set(days)].forEach(day => {
            schedule.push({
                date: day,
                rooms: []
            })
        })

        this.setState({
            days: [...new Set(days)],
            formatedSchedule: schedule,
            currentDay: schedule[0].date
        }, () => {
            console.log('STATE SHEDULE', this.state)
            schedule.forEach(item => {
                const slotsOfDay = this.props.schedule.map(slot => {
                    return this.getDayFromTime(slot.fromTime) === item.date ? slot : null
                }).filter(el => el);

                console.log('SLOT OF DAY', slotsOfDay);

                const rooms = slotsOfDay.map((item) => {
                    return item.room ? item.room : null
                })

                let unique = [...new Set(rooms)];
                console.log('ROOMS', unique);


                Object.assign(item.rooms, unique.filter(el => el).map(el => {
                    const room = {
                        name: el,
                        slots: []
                    }
                    return room;
                }))

                item.rooms.forEach( room => {
                    const slots = slotsOfDay.map((item) => {
                        return (item.room === room.name  ? item : null)
                    }).filter(el => el)
                    console.log("SLOTS", slots)
                    Object.assign(room.slots, slots )
                })

                console.log('--------------------------->', slotsOfDay);
            })
            console.log('NEW SCHEDULE : ', schedule);
            this.setState({
                formatedSchedule: schedule
            }, () => {
                console.log('STATE FORMATED', this.state)
            })
        });*/


    }

    getHourFromTime = (time) => time.split(' ')[1];
    getDayFromTime = (time) => time.split(' ')[0];

    getHoursTimeLine = (min, max) => {
        let rows = [];
        for (let i = min; i <= max; i++) {
            rows.push(
                <div>
                    <p>{i}</p>
                    <Dash/>
                    <Dash/>
                    <Dash/>
                </div>);
        }
        return rows;
    }

    getScheduleOfDay = () => {
        const scheduleOfDay = this.state.formatedSchedule.find(day => day.date === this.state.currentDay);
        console.log('SCHEDULE OF DAY', scheduleOfDay);
        return scheduleOfDay;
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
                padding: '0px 0px'
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
                                    this.formatSchedule().map( day => {
                                        return <Day className={ day.date === this.state.currentDay ? 'active' : ''} onClick={() => {
                                            this.setState({
                                                currentDay : day.date
                                            })
                                        }}>{ day.date }</Day>
                                    })
                                }
                            </Days>
                        </HeadSchedule>
                        <BodySchedule>
                            <HoursLine>
                                {this.getHoursTimeLine(this.state.startTime, this.state.endTime)}
                            </HoursLine>
                            <SwipeableViews enableMouseEvents disableLazyLoading style={styles.root} slideStyle={styles.slideContainer}>
                                {

                                    this.getScheduleOfDay() ? this.getScheduleOfDay().rooms.map(room => {
                                        return (
                                            <Column style={Object.assign({}, styles.slide, styles.slide1)}>
                                                <Head>{room.name}</Head>
                                            </Column>
                                        )
                                    }) : null
                                }
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