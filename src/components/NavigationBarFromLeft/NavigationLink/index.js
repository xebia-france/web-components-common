import React, {Component} from 'react';
import {Element} from "./styled";
import {getTemplateProps} from "../../../utils/gettersProperties";
import { getLinkProps} from "../utils";

class NavigationLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        const {Template, TemplateSubLinks,LinksConfig, hadChildren, children, open} = this.props;
        return (
            <Element hadChildren={hadChildren} {...getTemplateProps(Template)}
                     basisSubLink={TemplateSubLinks.settings.basis}
                     basisLink={getLinkProps(LinksConfig).basis}
                     className={['navigation-link', open ? 'open' : 'closed']}
                     onClick={() => {
                /*this.setState({
                    open: !this.state.open
                })*/

                localStorage.setItem('scrollPosition', 0);
            }}>
                {children}
            </Element>
        );
    }
}

NavigationLink.propTypes = {};

export default NavigationLink;