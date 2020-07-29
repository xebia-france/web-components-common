import React, {Component} from 'react';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import {
    Wrapper,
    Container,
    ShadowRight,
    ShadowLeft,
    HoursLine,
    Dash,
    Label,
    HeadSchedule,
    BodySchedule,
    BodyRooms,
    DashContainer,
    Day,
    Days, ContainerSchedule,
    Schedule, Filters, SwitchButtons, ToRight, ToLeft, Table
} from "./styled";
import {renderView} from './View';
import {getHoursTimeLine} from './TimeLine';
import {renderRooms} from './Rooms';
import {getHourFromTime, getDayFromTime, getStringDate, getBasisByType} from "./utils";
import {fileNameFromUrl} from "../../utils/functions";
import PopUp from './PopUp';
import SvgArrow from '../../assets/svg/SvgArrow';
import Slider from "react-slick";


class BasicSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbrColumn: 5,
            nbrColumnPerView: 3,
            index: 0,
            translatePosition: null,
            transition: 'transform 0.0s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
            openPopUp: false,
            filter: null,
            shadowLeft: false,
            shadowRight: true,
            activeItemIndex : 0
        };

        this.slider = React.createRef()
        this.table = React.createRef()

    }


    componentDidMount() {
        console.log('PROPS ON SCHEDULE', this.props);


        this.setState({
            formatedSchedule: this.formatSchedule(),
            speakers: this.formatSpeakers()
        }, () => {
            this.setState(prevState => ({
                ...prevState,
                scheduleOfDay: prevState.formatedSchedule[0],
                currentDay: prevState.formatedSchedule[0].date,
                nbrColumn: prevState.formatedSchedule[0].rooms.length === 0 ? 1 : prevState.formatedSchedule[0].rooms.length,
                nbrQuarters: this.getNumberQuarters(prevState.formatedSchedule[0].startTime, prevState.formatedSchedule[0].endTime),
                types: this.getTypesList(prevState.formatedSchedule[0])
            }), () => {
                console.log('schedule ok')

            });

        })


    }
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });



    fireOnScroll(e) {
        /* if(!this.state.shadowLeft && this.slider.current.scrollLeft !== 0){
             this.setState({shadowLeft : true })
         }
         if(this.state.shadowLeft && this.slider.current.scrollLeft === 0){
             this.setState({shadowLeft : false })
         }

         if( this.slider.current.scrollLeft > (this.table.current.clientWidth - this.slider.current.clientWidth  - 100)  && this.state.shadowRight){
             this.setState({shadowRight : false })
         }else if(this.slider.current.scrollLeft < (this.table.current.clientWidth - this.slider.current.clientWidth  - 100) && !this.state.shadowRight){
             this.setState({shadowRight : true })
         }*/
    }


    formatSpeakers = () => {
        const speakers = [];
        const data = this.props.data.speakers;

        data.forEach(s => {
            speakers.push({
                id: s.id,
                firstName: s.firstName,
                lastName: s.lastName,
                imageURL: fileNameFromUrl(s.imageURL)
            })
        })

        return speakers;
    }

    formatSchedule = () => {
        const schedule = [];

        const data = this.props.data.schedule.map(slot => {
            let copy = Object.assign({}, slot);
            copy.fromTime = this.formatMinutes(slot.fromTime)
            copy.toTime = this.formatMinutes(slot.toTime)
            return copy;
        })


        const days = data.map(slot => {
            return getDayFromTime(slot.fromTime);
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
            const slotsOfDay = data.map(slot => {
                return getDayFromTime(slot.fromTime) === item.date ? slot : null
            }).filter(el => el)


            const min = slotsOfDay.reduce((prev, current) => {
                return (getHourFromTime(prev.fromTime)) < (getHourFromTime(current.fromTime)) ? prev : current
            })
            item.startTime = this.formatMinutes(this.lowerRoundTimeQuarter(min.fromTime));

            const max = slotsOfDay.reduce((prev, current) => {
                return (getHourFromTime(prev.toTime)) > (getHourFromTime(current.toTime)) ? prev : current
            })
            item.endTime = this.formatMinutes(this.upperRoundTimeQuarter(max.toTime));

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

    formatMinutes = (time) => {
        if (Number((time.split(' ')[1]).split(':')[1]) === 0 && (time.split(' ')[1]).split(':')[1].length === 1) {
            time = `${time}0`
        }
        if ((time.split(' ')[1]).split(':')[0].length === 1) {
            let date = time.split(' ')[0];
            let hour = Number((time.split(' ')[1]).split(':')[0])
            let minutes = Number((time.split(' ')[1]).split(':')[1])

            time = `${date} 0${hour}:${minutes}`;
        }
        return time;
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


    updateIndex = index => {
        if (index > this.state.nbrColumn) return

        this.setState({
            index: index,
        }, () => {

            const css = this.viewsRef.current.containerNode.style.transform;
            this.setState({
                translatePosition: css,
            });
        });
    };

    changeCurrentDay = (date) => {
        this.setState({
            currentDay: date,
            index: 0
        }, () => {
            const currentSchedule = this.getScheduleOfDay();
            this.setState({
                scheduleOfDay: currentSchedule,
                nbrColumn: currentSchedule.rooms.length === 0 ? 1 : currentSchedule.rooms.length,
                nbrQuarters: this.getNumberQuarters(currentSchedule.startTime, currentSchedule.endTime),
                types: this.getTypesList(currentSchedule)
            })
        })
    }

    getTypesList = (schedule) => {
        const typesNotIncluded = ['break', 'pause', 'lunch', 'cocktail', 'déjeuner']
        let allSLots = [];
        schedule.rooms.forEach(room => {
            return room.slots.forEach(slot => allSLots.push(slot))
        })
        schedule.others.forEach(slot => allSLots.push(slot));
        let typesList = allSLots.map(slot => slot.type);
        console.log('typeList', typesList);
        typesList = [...new Set(typesList)].filter(f => !typesNotIncluded.includes(f));
        console.log('typesList 2', typesList);
        return typesList;

    }

    getNumberQuarters = (start, end) => {
        const hourStart = Number((start.split(' ')[1]).split(':')[0]);
        const minutesStart = Number((start.split(' ')[1]).split(':')[1]);
        const hourEnd = Number((end.split(' ')[1]).split(':')[0]);
        const minutesEnd = Number((end.split(' ')[1]).split(':')[1]);
        let quarters = 0;

        if (minutesStart !== 0) {
            Array.from(Array((Math.ceil(minutesStart / 15))), (e, i) => {
                quarters++;
            })

            for (let i = (hourStart + 1); i <= (hourEnd - 1); i++) {
                quarters = quarters + 4;
            }
        } else {
            for (let i = (hourStart); i <= (hourEnd - 1); i++) {
                quarters = quarters + 4;
            }
        }
        if (minutesEnd !== 0) {
            Array.from(Array((Math.ceil(minutesEnd / 15))), (e, i) => {
                quarters++;
            })
        }

        return quarters;


    }

    openPopUp = (slot) => {
        this.setState({
            openPopUp: true,
            selectedSlot: slot
        })
        this.disableScrolling();


    }
    closePopUp = () => {
        this.setState({
            openPopUp: false,
            selectedSlot: null
        })
        this.enableScrolling();
    }


    disableScrolling = () => {
        if (typeof window !== 'undefined' && typeof document !== `undefined`) {
            var x = window.scrollX;
            var y = window.scrollY;
            window.onscroll = function () {
                window.scrollTo(x, y);
            };
        }

    }

    enableScrolling = () => {
        if (typeof window !== 'undefined' && typeof document !== `undefined`) {
            window.onscroll = function () {
            };
        }
    }

    updateFilter = (filter) => {
        if (this.state.filter === filter) {
            this.setState({filter: null})
        }
        else {
            this.setState({filter: filter})
        }
    }

    handleEvent(e) {
        console.log('Scroll event detected!');
        console.log('e scroll', e);

    }

    render() {
        const {children, fields, name, assetsDirectory, data, locale} = this.props;
        const Template = fields.Template;
        const ScheduleField = fields.Schedule;
        const {activeItemIndex} = this.state;

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

        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            infinite : false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        if (!this.state.formatedSchedule || !this.state.scheduleOfDay) return null;
        //console.log('FINAL SCHEDULE', this.state.formatedSchedule)
        // console.log('SCHEDULE OF DAY', this.state.scheduleOfDay)

        console.log('THIS PROPS : ', this.props);
        return (
            <Wrapper id={removeSpaces(name)}
                     asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                     responsive={Template ? Template.responsiveSettings : null}
                     basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            ><Container>
                <div>Programme</div>
                <Schedule nbrQuarters={this.state.nbrQuarters}>
                    <HeadSchedule>
                        <Label><p>DAY</p></Label>
                        <Days>
                            {
                                this.state.formatedSchedule.map(day => {
                                    return <Day className={day.date === this.state.currentDay ? 'active' : ''}
                                                responsive={ScheduleField.responsiveSettings}
                                                basis={ScheduleField.settings.set1Bkg}
                                                typographyTitle={ScheduleField.settings.set1Title}
                                                onClick={() => this.changeCurrentDay(day.date)}>{getStringDate(day.date, locale)}</Day>
                                })
                            }
                        </Days>
                        <SwitchButtons index={this.state.index} nbrColumn={this.state.nbrColumn}>
                            <ToLeft onClick={() => {
                                if (this.state.index !== 0) {
                                    this.updateIndex(this.state.index - 1)
                                }
                            }}><SvgArrow/></ToLeft>
                            <ToRight onClick={() => {console.log('click next')}}><SvgArrow/></ToRight>
                        </SwitchButtons>
                    </HeadSchedule>

                    <ContainerSchedule>
                        <HoursLine>
                            <Label><p>ROOM</p></Label>
                            {getHoursTimeLine(this.state.scheduleOfDay.startTime, this.state.scheduleOfDay.endTime)}
                        </HoursLine>
                        <Slider {...settings}>

                            {
                                this.state.scheduleOfDay ? renderView(this.state.scheduleOfDay, styles, this.openPopUp, this.state.filter, ScheduleField) : null
                            }
                        </Slider>
                    </ContainerSchedule>


                    <ShadowLeft nbrQuarters={this.state.nbrQuarters}
                                className={this.state.shadowLeft ? 'display' : ''}/>
                    <ShadowRight nbrQuarters={this.state.nbrQuarters}
                                 className={this.state.shadowRight ? 'display' : ''}/>
                    <Filters responsive={ScheduleField.responsiveSettings}
                             basis={ScheduleField.settings.set1Bkg}
                             typographyTitle={ScheduleField.settings.set1Title}>
                        {
                            this.state.types ?
                                this.state.types.map(type => {
                                    return <div className={this.state.filter === type ? 'active' : ''}
                                                onClick={() => this.updateFilter(type)}>{type}</div>
                                })
                                : null
                        }
                    </Filters>
                </Schedule>

            </Container>
                <PopUp open={this.state.openPopUp} closePopUp={this.closePopUp} slot={this.state.selectedSlot}
                       allSpeakers={this.state.speakers} assetsDirectory={assetsDirectory} locale={locale}
                       fieldSettings={ScheduleField}/>
            </Wrapper>

        )
    }
}


BasicSchedule.defaultProps = {}
export default BasicSchedule;


/*

                        <BodySchedule nbrColumn={this.state.nbrColumn} index={this.state.index}
                                  nbrQuarters={this.state.nbrQuarters} filter={this.state.filter}  ref={this.slider} onScroll={(e) => this.fireOnScroll(e)} >

                        {
                            /*

                            <Table ref={this.table} nbrColumn={this.state.nbrColumn} >
                            {
                                this.state.scheduleOfDay ? renderView(this.state.scheduleOfDay, styles, this.openPopUp, this.state.filter, ScheduleField) : null
                            }
                            </Table>
                        </BodySchedule>


                             */