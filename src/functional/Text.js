import React from 'react';
import PropTypes from 'prop-types';
import {TextCommon} from "../styles/common.styled";
import {getTextProps} from "../utils/gettersProperties";

const Text = ({field, language}) => {
    const content = field.content.text ? field.content.text[language] : null
    if (!content) return null;
    return (<TextCommon {...getTextProps(field)}>{content}</TextCommon>);
};

Text.propTypes = {
    field : PropTypes.object,
    language : PropTypes.number
};

export default Text;
