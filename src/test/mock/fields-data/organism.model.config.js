import {
    size,
    iconFont,
    borderRadius,
    colorAndGradient,
    transparent,
    flexProperties1,
    flexProperties2,
    flexProperties3,
    black,
    paragraph,
    white,
    padding,
    margin,
    shadow, opacityBHD,paddingSection,
    borderWidth, textProps, alignmentCenter, opacity, backgroundPosition, alignmentStart
} from "./atom.model.config";

import {
    basisMTDforText,
    borderBHD,
    borderMTD,
    flexMTD, iconMTD,
    typographyParagraphCTA,
    typographyParagraphMTD,
    typographyTitle3MTD,typographyTitle4MTD
} from "./molecules.model.config";

export const settingsCTA = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        state: {
            external: false,
            disabled: false,
            animation : ''
        },
        basis: {
            M: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            },
            T: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            },
            D: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            }
        },
        typography: typographyParagraphCTA,
        icon: iconMTD,
        border: borderBHD
    }
}

export const settingsCTAnoState = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: {
            M: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            },
            T: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            },
            D: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentCenter,
                shadow: shadow,
                color: {
                    basic: white,
                    hover: white,
                    disabled: white
                },
                opacity: opacityBHD
            }
        },
        typography: typographyParagraphCTA,
        icon: iconMTD,
        border: borderBHD
    }
}

export const settingsTemplate = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: {
            M: {
                size: size,
                padding: padding,
                margin: margin,
                color: colorAndGradient,
                opacity: opacity,
                shadow: shadow,
                background: backgroundPosition
            },
            T: {
                size: size,
                padding: padding,
                margin: margin,
                color: colorAndGradient,
                opacity: opacity,
                shadow: shadow,
                background: backgroundPosition
            },
            D: {
                size: size,
                padding: padding,
                margin: margin,
                color: colorAndGradient,
                opacity: opacity,
                shadow: shadow,
                background: backgroundPosition
            }
        },
        border: borderMTD
    }
}

export const settingsSectionTemplate = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: {
            M: {
                size: size,
                padding: paddingSection,
                margin: margin,
                color: colorAndGradient,
                opacity: opacity,
                background: backgroundPosition
            },
            T: {
                size: size,
                padding: paddingSection,
                margin: margin,
                color: colorAndGradient,
                opacity: opacity,
                background: backgroundPosition
            },
            D: {
                size: size,
                padding: paddingSection,
                margin: margin,
                color: colorAndGradient,
                opacity: opacity,
                background: backgroundPosition
            }
        },
        border: borderMTD
    }
}

export const settingsFlexContainer = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        flex: flexMTD
    }
}

export const settingsTitle = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: basisMTDforText,
        typography: typographyTitle3MTD,
        border: borderMTD,
        seo: {
            tag: 'h2'
        }
    }
}
export const settingsTagline = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: basisMTDforText,
        typography: typographyTitle4MTD,
        border: borderMTD,
        seo: {
            tag: 'h4'
        }
    }
}

export const settingsText = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: basisMTDforText,
        typography: typographyParagraphMTD
    }
}

export const settingsSimpleText = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        typography: typographyParagraphMTD
    }
}

export const settingsSingleImage = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: {
            M: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentStart
            },
            T: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentStart
            },
            D: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentStart
            }
        },
        border: borderMTD
    }
}


export const settingsSingleImageWithColor = {
    responsive: ['M', 'T', 'D'],
    defaultValue: {
        basis: {
            M: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentStart,
                color: transparent,
                opacity: opacity
            },
            T: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentStart,
                color: transparent,
                opacity: opacity
            },
            D: {
                size: size,
                padding: padding,
                margin: margin,
                alignment: alignmentStart,
                color: transparent,
                opacity: opacity
            }
        },
        border: borderMTD
    }
}

