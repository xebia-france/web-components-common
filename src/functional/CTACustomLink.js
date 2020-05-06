import React from 'react';
import PropTypes from 'prop-types';
import {CTACommon} from "../styles/common.styled";
import {getCTAProps} from "../utils/gettersProperties";


const CTACustomLink = ({field, language, link, animateUnderline}) => {
    const content = field.content.text && field.content.text[language] ? field.content.text[language] : null;
    const icon = field.content.icon && field.content.icon[language] ? field.content.icon[language] : null;

    if (!content && !icon) return null;
    return (
        <CTACommon {...getCTAProps(field)}
                   animateUnderline={animateUnderline || null}
                   href={link}
                   target={field.settings.state && field.settings.state.external ? '_blank' : ''}
                   className={field.settings.state && field.settings.state.disabled ? 'disabled' : ''}
                   onClick={(e) => {
                       if (field.settings.state && field.settings.state.disabled) e.preventDefault();
                   }}

        >
            {icon ? <i>{icon}</i> : null}
            {content ? <p>{content}</p> : null}
        </CTACommon>
    );
};

CTACustomLink.defaultProps = {}

export default CTACustomLink;
