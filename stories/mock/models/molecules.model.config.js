import {
    borderWidth,
    title3, title4,
    white,
    paragraph,
    black,
    borderRadius,
    textProps, iconFont, opacityBHD,
    transparent, flexProperties2, flexProperties3, flexProperties1, padding, opacity
} from "./atom.model.config";



export const borderMTD = {
    M: {
        width: borderWidth,
        radius: borderRadius,
        color: transparent,
        opacity: opacity
    },
    T: {
        width: borderWidth,
        radius: borderRadius,
        color: transparent,
        opacity: opacity
    },
    D: {
        width: borderWidth,
        radius: borderRadius,
        color: transparent,
        opacity: opacity
    }
}

export const borderBHD = {
    M: {
        width: borderWidth,
        radius: borderRadius,
        color: {
            basic: white,
            hover: white,
            disabled: white
        },
        opacity: opacityBHD
    },
    T: {
        width: borderWidth,
        radius: borderRadius,
        color: {
            basic: white,
            hover: white,
            disabled: white
        },
        opacity: opacityBHD
    },
    D: {
        width: borderWidth,
        radius: borderRadius,
        color: {
            basic: white,
            hover: white,
            disabled: white
        },
        opacity: opacityBHD
    }
}

export const flexMTD = {
    M: {
        properties: flexProperties1
    },
    T: {
        properties: flexProperties2
    },
    D: {
        properties: flexProperties3
    }
}

export const basisMTDforText = {
    M: {
        padding: padding
    },
    T: {
        padding: padding
    },
    D: {
        padding: padding
    }
}



// TYPO

export const typographyParagraphMTD = {
    M: {
        font: {
            theme: 'Paragraph',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    },
    T: {
        font: {
            theme: 'Paragraph',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    },
    D: {
        font: {
            theme: 'Paragraph',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    }
}

export const typographyTitle3MTD = {
    M: {
        font: {
            theme: 'Title3',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    },
    T: {
        font: {
            theme: 'Title3',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    },
    D: {
        font: {
            theme: 'Title3',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    }
}

export const typographyTitle4MTD = {
    M: {
        font: {
            theme: 'Title4',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    },
    T: {
        font: {
            theme: 'Title4',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    },
    D: {
        font: {
            theme: 'Title4',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: black,
        opacity: {
            value: '1'
        }
    }
}

export const typographyParagraphCTA = {
    M: {
        font: {
            theme: 'Paragraph',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: {
            basic: black,
            hover: black,
            disabled: white
        },
        opacity: opacityBHD
    },
    T: {
        font: {
            theme: 'Paragraph',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: {
            basic: black,
            hover: black,
            disabled: white
        },
        opacity: opacityBHD
    },
    D: {
        font: {
            theme: 'Paragraph',
            family: null,
            typeface: null,
            weight: null,
            style: null,
            size: null,
            lineHeight: null,
            letterSpacing: '0'
        },
        text: textProps,
        color: {
            basic: black,
            hover: black,
            disabled: white
        },
        opacity: opacityBHD
    }
}

export const iconMTD = {
    M: {
        font: {
            family: null,
            typeface: null,
            weight: null,
            size: null,
            lineHeight: null,
        },
        padding: padding,
        color: {
            basic: black,
            hover: black,
            disabled: black
        },
        opacity: opacityBHD

    },
    T: {
        font: {
            family: null,
            typeface: null,
            weight: null,
            size: null,
            lineHeight: null,
        },
        padding: padding,
        color: {
            basic: black,
            hover: black,
            disabled: black
        },
        opacity: opacityBHD

    },
    D: {
        font: {
            family: null,
            typeface: null,
            weight: null,
            size: null,
            lineHeight: null,
        },
        padding: padding,
        color: {
            basic: black,
            hover: black,
            disabled: black
        },
        opacity: opacityBHD
    }
}