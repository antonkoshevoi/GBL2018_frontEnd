import React, { Component } from 'react';

class MessageDivider extends Component {

  render() {
    return (
      <div style={{
        textAlign: 'center',
        borderBottom: '1px solid #589ee4',
        color: '#32587d',
        fontSize: '18px'
      }}>
        <span style={{
          transform: 'translateY(12px)',
          display: 'inline-block',
          background: '#fff',
          padding: '0 14px'
        }}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

export default MessageDivider;