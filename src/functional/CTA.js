import React from 'react';
import PropTypes from 'prop-types';
import {CTACommon} from "../styles/common.styled";
import {getCTAProps} from "../utils/gettersProperties";


const CTA = ({field, language}) => {
    const content = field.content.text && field.content.text[language] ? field.content.text[language] : null;
    const icon = field.content.icon && field.content.icon[language] ? field.content.icon[language] : null;

    const link = field.content.link && !field.settings.state.disabled ? field.content.link[language] : ''

    if (!content && !icon) return null;
    return (
        <CTACommon {...getCTAProps(field)}
                   href={link}
                   target={field.settings.state.external ? '_blank' : ''}
                   rel={field.settings.state.external ? 'noopener' : ''}
                   className={field.settings.state.disabled ? 'disabled' : ''}
                   onClick={(e) => {
                       if (field.settings.state.disabled) e.preventDefault();
                   }}

        >
            {icon ? <i>{icon}</i> : null}
            {content ? <p>{content}</p> : null}
        </CTACommon>
    );
};

CTA.defaultProps = {}

export default CTA;
