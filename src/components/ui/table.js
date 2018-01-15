import React from 'react';

export const Table = (props) => {
  return(
    <div className="m_datatable m-datatable m-datatable--default m-datatable--loaded" id="ajax_data" >
      <table className="m-datatable__table" >
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

export const Row = ({ key, ...props}) => {
  return (
    <tr key={key} data-row="0" className={`m-datatable__row ${(key % 2 !== 0 ? 'm-datatable__row--even' : '')}`} style={{height: '64px'}}>
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

export const Th = ({ first, width, ...props}) => {
  return (
    <th className={first ? 'm-datatable__cell--center m-datatable__cell m-datatable__cell--check' : 'm-datatable__cell'}><span style={{width: `${width}`}}>
      {props.children}
    </span></th>
  );
};

export const Td = ({ first, width, ...props}) => {
  return (
    <td className={first ? 'm-datatable__cell--center m-datatable__cell m-datatable__cell--check' : 'm-datatable__cell'}><span style={{width: `${width}`}}>
      {props.children}
    </span></td>
  );
};