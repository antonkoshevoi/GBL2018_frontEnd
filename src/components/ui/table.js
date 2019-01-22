import React from 'react';
import {CircularProgress} from '@material-ui/core';

export const Table = ({ className, ...props}) => {        
    
  return(
  <div className="table-responsive" id="ajax_data" >
    <table className={`table ${className || ''}`} >
    {props.children}
    </table>
  </div>
  );
};

export const Thead = (props) => {
  return (
    <thead {...props}>{props.children}</thead>
  );
};

export const Tbody = (props) => {
  return (
    <tbody>{props.children}</tbody>
  );
};

export const Row = ({ index, ...props}) => {
  return (
    <tr>{props.children}</tr>
  );
};

export const HeadRow = (props) => {
  return (
    <tr className={`active ${props.className || ''}`}>{props.children}</tr>
  );
};


export const Th = ({ width, className, name, onSort, dir = undefined, ...props}) => {
  
  className = className || 'table-head';
  
  if (onSort) {
      className = 'sort-table-head ' + className;
  }
    
  return (
    <th width={width} className={className} onClick={onSort && (() => { onSort(name) })}>
      <span>{props.children}</span>
      {dir && (dir === 'asc' ? <i className="sort-arrow la la-angle-up"></i> : <i className="sort-arrow la la-angle-down"></i>)}
    </th>
  );
};

export const Td = (props) => {
  return (
    <td {...props}>    
      {props.children}    
    </td>
  );
};

export const EditButton = ({ id, onClick, ...props}) => {
    return (
        <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={onClick && (() => { onClick(id) })}>
            <i className='la la-pencil'></i>
        </button>
    );
};

export const MessageRow = ({colSpan = 10, ...props}) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="table-message">
          <h2>{props.children}</h2>
        </div>
      </td>
    </tr>
  );
};

export const TablePreloader = ({color, text, colSpan = 10}) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="table-message">
          <h2>{text} <CircularProgress color={color}/></h2>
        </div>
      </td>
    </tr>
  );
};

export const MyPreloader = ({color,text}) => {
    return (
        <div className="table-message">
            <h2>{text} <CircularProgress color={color}/></h2>
        </div>
    );
};