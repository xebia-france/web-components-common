import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.p`
	color : blue;
	font-size : 12px;
`;


export default function SimpleText (props) {
    return (<div className="label">
        <Text>{props.content || 'Yeay'}</Text>
    </div>);
}

SimpleText.defaultProps = {
    content: 'i try and try and try'
};

SimpleText.propTypes = {
    content: PropTypes.string
};
