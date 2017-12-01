import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { primary, white } from './theme';

const Controls = props => {
    const run = () => {
        props.run(props.doors);
    };
    return (
        <FlatButton
            style={{ 
                backgroundColor: primary,
                color: white,
            }}
            label={`run (${props.runCount})`}
            primary={true}
            onClick={run}
        />
    );
};

export default Controls;
