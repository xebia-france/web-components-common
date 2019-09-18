import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
const Text = styled.p`
	color : blue;
	font-size : 12px;
`;*/

/*
export default function SimpleText (props) {
    return <div className="label" style={{ color: 'red' }}>
       {props.content || 'Yeay'}
    </div>
}*/


const Div = styled.div`
  color : blue;
 
`;

export default class SimpleText extends Component {

    componentDidMount(){
        console.log('TEST MOUNT');
        console.log('DIV styled', Div);
    }




    render () {
        const { content } = this.props;

        const divStyle = {
            color: 'red'
        };

        return (
            <Div className="label">
                {content || 'Yeay'}
            </Div>
        );
    }
}

SimpleText.defaultProps = {
    content: 'i try and try and try'
};

SimpleText.propTypes = {
    content: PropTypes.string
};

