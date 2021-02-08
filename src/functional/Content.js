import React from 'react';
import PropTypes from 'prop-types';
import {ContentCommon} from "../styles/common.styled";
import {getContentProps} from "../utils/gettersProperties";

const Content = ({field, language}) => {
    const html = field.content.html ? field.content.html[language] : null
    if (!html) return null;
    return (
        <ContentCommon {...getContentProps(field)} dangerouslySetInnerHTML={{__html: html}}/>
    );
};

Content.propTypes = {
    field : PropTypes.object,
    language : PropTypes.number
}

export default Content;
