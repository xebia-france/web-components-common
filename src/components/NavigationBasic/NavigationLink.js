import React, {Component} from 'react';
import { LinkElement } from './styled'

class NavigationLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        const { children } = this.props;



        return (
            <LinkElement className={this.state.open ? 'open' : 'closed'} onClick={() => {
                this.setState({
                    open : !this.state.open
                })
            }}>
                { children }
            </LinkElement>
        );
    }
}


NavigationLink.propTypes = {

};

export default NavigationLink;
