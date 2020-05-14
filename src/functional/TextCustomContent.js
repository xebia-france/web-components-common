import React from 'react';
import PropTypes from 'prop-types';
import {TextCommon} from "../styles/common.styled";
import {getTextProps} from "../utils/gettersProperties";


const TextCustomContent = ({field, content}) => {
    if (!content) return null;
    return (<TextCommon {...getTextProps(field)}>{ content }</TextCommon>);
};

TextCustomContent.defaultProps = {}

export default TextCustomContent;
