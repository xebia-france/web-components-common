import React from 'react';
import {Element} from "./styled";
import {getTemplateProps} from "../../../utils/gettersProperties";

const NavigationLink = ({Template, TemplateSubLinks, hadChildren, children, open}) => {
    return (
        <Element hadChildren={hadChildren} {...getTemplateProps(Template)}
                 basisSubLink={TemplateSubLinks.settings.basis}
                 className={['navigation-link', open ? 'open' : 'closed']}
                 onClick={() => {localStorage.setItem('scrollPosition', 0);}}>
            {children}
        </Element>
    );
}

NavigationLink.propTypes = {};

export default NavigationLink;