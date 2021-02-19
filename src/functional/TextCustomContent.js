import React from 'react';
import PropTypes from 'prop-types';
import {TextCommon} from "../styles/common.styled";
import {getTextProps} from "../utils/gettersProperties";


const TextCustomContent = ({field, content}) => {
    if (!content) return null;
    return (<TextCommon {...getTextProps(field)}>{ content }</TextCommon>);
};

TextCustomContent.propTypes = {
    field: PropTypes.object,
    content: PropTypes.string
};

export default TextCustomContent;
