import React from 'react';
import PropTypes from 'prop-types';

export default function TextElement (props) {
    return <div className="label">{props.content || 'Yeay'}</div>;
}

TextElement.defaultProps = {
    content: 'default text'
};

TextElement.propTypes = {
    content: PropTypes.string
};
