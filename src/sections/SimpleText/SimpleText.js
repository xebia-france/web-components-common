import React from "react";
import PropTypes from 'prop-types';

export default function SimpleText(props) {
    return <div className="label">{props.content || "Yeay"}</div>;
}


SimpleText.defaultProps = {
    content: 'default text'
};


SimpleText.propTypes = {
    content: PropTypes.string
};
