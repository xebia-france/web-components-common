import React from 'react';

export default function BaseButton (props) {
    return (
        <button
            className="add-button"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.content || 'Add 👍'}
        </button>
    );
}
