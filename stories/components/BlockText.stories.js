import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, number, object} from '@storybook/addon-knobs/react';
import {withInfo} from '@storybook/addon-info';
import BlockText from '../../src/components/BlockText';
import {Template, TextMock, ContentMock} from '../mock';




storiesOf('Components.BlockText', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('BlockText with title', () => {
        const language = number('Language', 0);
        const width = text("Width", 100);
        const TemplateSettings = {
            basis: {
                A: {
                    size: {
                        width: width,
                        height: "",
                        maxWidth: "",
                        maxHeight: "",
                        minWidth: "",
                        minHeight: ""
                    },
                    padding: {
                        top: "0",
                        right: "0",
                        bottom: "0",
                        left: "0"
                    },
                    margin: {
                        top: "0",
                        right: "0",
                        bottom: "0",
                        left: "0"
                    },
                    color: {
                        hex: "#FFFFFF",
                        rgb: "255,255,255",
                        name: "White",
                        shade: null
                    },
                    opacity: {
                        value: 1
                    },
                    background: {
                        top: "0"
                    }
                }
            },
            border: {
                A: {
                    width: {
                        top: "1",
                        right: "1",
                        bottom: "1",
                        left: "1"
                    },
                    radius: {
                        topLeft: "5",
                        topRight: "5",
                        bottomLeft: "5",
                        bottomRight: "5"
                    },
                    color: {
                        hex: "#B2B2B2",
                        rgb: "178,178,178",
                        name: "Grey",
                        shade: "60"
                    },
                    opacity: {
                        value: "1"
                    }
                }
            }
        }
        const fieldsMock =  {
            Template: {
                content: {},
                responsiveSettings: ['A'],
                settings : TemplateSettings
            },
            Title: TextMock
        };


        return <BlockText fields={fieldsMock} language={language}/>;
    })

