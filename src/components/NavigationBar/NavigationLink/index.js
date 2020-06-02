import React, {Component} from 'react';
import {Element} from "./styled";
import {getTemplateProps} from "../../../utils/gettersProperties";

class NavigationLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        const {Template, TemplateSubLinks, hadChildren, children} = this.props;

        return (
            <Element hadChildren={hadChildren} {...getTemplateProps(Template)}
                     basisSubLink={TemplateSubLinks.settings.basis}
                     className={this.state.open ? 'open' : 'closed'} onClick={() => {
                this.setState({
                    open: !this.state.open
                })
                localStorage.setItem('scrollPosition', 0);
            }}>
                {children}
            </Element>
        );
    }
}

NavigationLink.propTypes = {};

export default NavigationLink;
