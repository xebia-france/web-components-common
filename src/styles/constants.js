export const theme = {
    black: '#000000',
    white: '#FFFFFF',
    grey10: '#F7F9FA',
    grey20: '#eeeeef',
    grey30: '#d5dde2',
    grey40: '#C5D1D8',
    grey50: '#CBCBCB',
    grey60: '#B2B2B2',
    grey80: '#969FA6',
    greenM: '#14D292',
    greenL: '#0CAA75',
    greenXL: '#0baa75',
    redXS: '#fcf0f0',
    redM: '#ea3223',
    redL: '#960707',
    orange: '#FFB100',
    blueM: '#5b9fef',
    blueL: '#00C7D8'
};


// Breakpoints that are being used

const size = {
    M: '425px',
    T: '768px',
    D: '1280px'
};

export const device = {
    A: `(min-width: 0px) `,
    M: `(max-width: ${ '767px' }) `,
    T: `(min-width: ${ size.T }) and (max-width: 1279px)`,
    D: `(min-width: ${ size.D })`
};
