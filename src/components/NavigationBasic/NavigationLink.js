import React, {Component} from 'react';

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
            <li className={this.state.open ? 'open' : 'closed'} onClick={() => {
                this.setState({
                    open : !this.state.open
                })
                localStorage.setItem('scrollPosition', 0);
            }}>
                { children }
            </li>
        );
    }
}

NavigationLink.propTypes = {};

export default NavigationLink;
