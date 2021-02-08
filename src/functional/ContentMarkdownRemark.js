import React from 'react';
import PropTypes from 'prop-types';
import {ContentCommon} from "../styles/common.styled";
import {getContentProps} from "../utils/gettersProperties";


const ContentMarkdownRemark = ({ field, content}) => {
    const html = content && content.childMarkdownRemark ? content.childMarkdownRemark.html : null
    if (!html) return null;
    return (
        <ContentCommon {...getContentProps(field)} dangerouslySetInnerHTML={{__html: html}}/>
    );
};

ContentMarkdownRemark.propTypes = {
    field : PropTypes.object,
    content : PropTypes.object
}

export default ContentMarkdownRemark;
