import React from 'react';
import { MenuItem, Select } from '@material-ui/core';

export const SelectPerPage = ({value, onChange, className}) => {    
    return <Select
        className={className || ''}
        value={value}
        onChange={(e) => { onChange(e.target.value) }}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>;
}

              