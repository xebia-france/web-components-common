import React from 'react';
import PropTypes from 'prop-types';
import {IconCommon} from "../../../styles/common.styled";

const IconElement = ({field, property, content, link}) => {
    return (
        <IconCommon
            responsive={field.responsiveSettings}
            icon={field.settings[property]}
            target={'_blank'}
            rel={'noopener'}
            href={link}
        >
            <i>{content}</i>
        </IconCommon>
    );
};

IconElement.defaultProps = {}

export default IconElement;
