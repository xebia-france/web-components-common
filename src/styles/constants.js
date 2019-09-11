export const theme = {
    primaryColor: '#2a374e', // #1b1c1d  '#ff7c00'
    accentColor: '#f28c1c ',
    ternaryColor: '#fff',
    red: '#ED1C24',
    lightBlue: '#5675EE'
};

// Can be used for other colors
// const colors = {};
// const sizes = {}

// Breakpoints that are being used

export const gutter = {
    S: 15,
    M: 20,
    L: 20
};

export const screen = {
    S: 480,
    M: 980,
    L: 1280
};

export const brk = {
    small: '50em',
    S: (2 * gutter.S) + screen.S + 'px',
    M: (2 * gutter.M) + screen.M + 'px',
    L: (2 * gutter.L) + screen.L + 'px'
};

const size = {
    M: '425px',
    T: '768px',
    D: '1280px'
};

export const device = {
    A: `(min-width: 0px) `,
    M: `(max-width: ${ size.T }) `,
    T: `(min-width: ${ size.T }) and (max-width: ${ size.D })`,
    D: `(min-width: ${ size.D })`
};
