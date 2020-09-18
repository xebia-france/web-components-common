import {basisMTDforText, borderMTD, typographyParagraphMTD} from "./models/molecules.model.config";

export const ContentMock = {
    content: {
        html: {
            0: '<p>Contenu</p',
            1: '<p>Inner</p>'
        }
    },
    responsiveSettings: ['A'],
    settings: {
        basis: basisMTDforText,
        typography: typographyParagraphMTD,
        border: borderMTD
    }
};

