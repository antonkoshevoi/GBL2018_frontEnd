import React from 'react';
import {CircularProgress} from '@material-ui/core';

export const Preloader = ({color,text}) => {
    return (
        <div className="table-message">
            <h2>{text} <CircularProgress color={color}/></h2>
        </div>
    );
};