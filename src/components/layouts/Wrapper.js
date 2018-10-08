import React, {Component} from 'react';
import {connect} from 'react-redux';

class Wrapper extends Component {

    render() {
        const { auth } = this.props;

        return (
            <div className={`m-grid__item m-grid__item--fluid m-wrapper ${auth.get('isLoggedIn') ? '' : 'margin-0'}`}>               
                <div className="m-content">                    
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Wrapper = connect(
  (state) => ({
    auth: state.auth
  })
)(Wrapper);

export default Wrapper;

