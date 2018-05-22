import React from 'react';
import {CircularProgress} from "material-ui";

export const Table = ({ className, ...props}) => {
  return(
  <div className="m_datatable m-datatable table-responsive m-datatable--default m-datatable--loaded" id="ajax_data" >
    <table className={"m-datatable__table " + className} >
    {props.children}
    </table>
  </div>
  );
};

export const Thead = (props) => {
  return (
  <thead className="m-datatable__head">
    {props.children}
  </thead>
  );
};

export const Tbody = (props) => {
  return (
  <tbody className="m-datatable__body" >
    {props.children}
  </tbody>
  );
};

export const Row = ({ index, ...props}) => {
  return (
  <tr data-row="0" className={`m-datatable__row ${(index % 2 !== 0 ? 'm-datatable__row--even__none' : '')}`} style={{height: '64px'}}>
    {props.children}
  </tr>
  );
};

export const HeadRow = (props) => {
  return (
  <tr className="m-datatable__row" style={{height: '56px'}}>
    {props.children}
  </tr>
  );
};


export const Th = ({ first, width,classNames, name, onSort, dir = undefined, ...props}) => {
  return (
    <th width={width} className={(onSort ? 'sort-table-head ' : '') +  (first ? 'm-datatable__cell--center m-datatable__cell m-datatable__cell--check' : 'm-datatable__cell') + ` ${classNames} `}
      onClick={onSort && (() => { onSort(name) })}>
      <span style={{width: `${width}`}}>
        {props.children}
      </span>
      {dir &&
        (dir === 'asc' ? <i className="sort-arrow la la-angle-up"></i> : <i className="sort-arrow la la-angle-down"></i>)
      }
    </th>
  );
};

export const Td = ({ first, width, ...props}) => {
  return (
  <td width={width} className={first ? 'm-datatable__cell--center m-datatable__cell m-datatable__cell--check' : 'm-datatable__cell'}>
    <span style={{width: `${width}`}}>
    {props.children}
    </span>
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


export const TablePreloader = ({color,text, ...props}) => {
  return (
    <tr>
      <td style={{minWidth: '300px'}}>
        <div className="table-message">
          <h2>{text} <CircularProgress color={color}/></h2>
        </div>
      </td>
    </tr>
  );
};

export const MyPreloader = ({color,text, ...props}) => {
    return (
            <div className="table-message">
                <h2>{text} <CircularProgress color={color}/></h2>
            </div>
    );
};