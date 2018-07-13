import React from 'react';

const ConfirmButton = ({ onClick, ...rest }) => {

  const _onClick = (e) => {
    if (window.confirm('Are you sure?')) {
      return onClick (e);
    }
  };

  return (
    <button
      {...rest}
      onClick={_onClick}>
    </button>
  );
};

export default ConfirmButton;