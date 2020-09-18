import {
    size,
    padding,
    margin,
    white,
    grey60,
    opacity,
    backgroundPosition,
    borderWidth1,
    borderRadius5, transparent
} from "./models/atom.model.config";

export const Template = {
    content: {},
    responsiveSettings: ['A'],
    settings: {
        basis: {
            A: {
                size: size,
                padding: padding,
                margin: margin,
                color: white,
                opacity: opacity,
                background : backgroundPosition
            }
        },
        border: {
            A: {
                width: borderWidth1,
                radius: borderRadius5,
                color: grey60,
                opacity: opacity
            }
        }
    }
};
