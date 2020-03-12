import React, {Component} from 'react';
import {Wrapper, Container, Test} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import SwipeableViews from 'react-swipeable-views';


class BasicSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }



    componentDidMount(){
        console.log('SCHEDULE : ', this.props.schedule);
    }
    render(){
        const {children, fields, name, assetsDirectory, schedule} = this.props;

        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;

        const styles = {
            root: {
                padding: '0 30px',
            },
            slideContainer: {
                padding: '0 10px',
            },
            slide: {
                padding: 15,
                minHeight: 100,
                color: '#fff',
            },
            slide1: {
                backgroundColor: '#FEA900',
            },
            slide2: {
                backgroundColor: '#B3DC4A',
            },
            slide3: {
                backgroundColor: '#6AC0FF',
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

                    <SwipeableViews enableMouseEvents style={styles.root} slideStyle={styles.slideContainer}>
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
                        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
                    </SwipeableViews>

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
