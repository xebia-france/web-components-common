import { basisMTDforText, typographyTitle3MTD, borderMTD} from "./models/molecules.model.config";

export const TextMock = {
    content: {
        text: {
            0: 'Un text',
            1: 'Some text'
        }
    },
    responsiveSettings: ['M', 'T', 'D'],
    settings: {
        basis: basisMTDforText,
        typography: typographyTitle3MTD,
        border: borderMTD,
        seo: {
            tag: 'h2'
        }

    }
};


export const SmallText = {
    content: {
        text: {
            0: 'Un petit text',
            1: 'Some small text'
        }
    },
    responsiveSettings: ['A'],
    settings: {
        color: {
            A: {
                hex: '#989898',
                name: 'Grey',
                rgb: '152,152,152',
                shade: '50'
            }
        },
        font: {
            A: {
                family: 'Arial',
                letterSpacing: '0',
                lineHeight: '24',
                size: '18',
                style: null,
                theme: 'paragraph',
                typeface: 'sans-serif',
                weight: ['Regular', 400]
            }
        },
        text: {
            A: {
                align: 'center',
                decoration: null,
                transform: null
            }
        },
        opacity: {
            A: {
                value: '1'
            }
        },
        seo: {
            tag: 'h4'
        }

    }
};