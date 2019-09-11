import { configure, addParameters } from '@storybook/react';

addParameters({
    options: {
        name: 'Web components Storybook',
        isFullscreen: false,
        showPanel: true,
    },
});

const req = require.context('../src', true, /[^/]+\/*.stories.js$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);