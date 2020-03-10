import React from 'react';
import PropTypes from 'prop-types';
import {TextCommon} from "../../../styles/common.styled";

const TextElement = ({ field, property, content }) => {
    return (
        <TextCommon
            responsive={field.responsiveSettings}
            typography={field.settings[property]}
            basis={field.settings[property]}
        >
            {content}
        </TextCommon>
    );
};

TextElement.defaultProps = {}

export default TextElement;
