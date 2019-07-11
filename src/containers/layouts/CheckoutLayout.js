import React, {Component} from 'react';
import {connect} from 'react-redux';
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";

class CheckoutLayout extends Component {
    render() {    
        return (
            <div className="m-page m--full-height">
                <div className="m-body main-background justify-content-center">
                    <header className="m-header checkout-header">
                        <div className="container h-100 d-flex align-items-center justify-content-between">
                            <a className="m-nav__link" href={this.props.auth.get('isLoggedIn') ? '/dashboard' : '/'}>
                                <span className="m-nav__link-icon">
                                    <i className="fa fa-home display-7"></i>
                                </span>
                            </a>                
                            <LanguageSwitcher />                                                
                        </div>
                    </header>
                    <div>            
                        {this.props.children}            
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({auth: state.auth})
)(CheckoutLayout);
    
    