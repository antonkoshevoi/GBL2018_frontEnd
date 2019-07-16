import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import CldImage from '../../../components/ui/CldImage';

class SplashFooter extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {                 
            footerPosition: -1000            
        };
    }
  
    componentDidMount() {         
        window.addEventListener('scroll', this.setHeaderPosition.bind(this));    
    }

    componentWillUnmount() {        
        window.removeEventListener('scroll', this.setHeaderPosition.bind(this));
    }  

    setHeaderPosition(){    
        let footer = document.getElementById('footer');
        let header = document.getElementById('main-banner');
        let position = this.state.footerPosition;
        
        if (!footer || !header) {
            return false;
        }
                
        position = window.scrollY - (header.clientHeight + footer.clientHeight);
        
        if (position > 0) {
            position = 0;
        }                    
        this.setState({footerPosition: position});        
    }
    
    render() {
        const {t} = this.props;
        
        return (
            <div id="footer" style={{bottom: this.state.footerPosition}}>
                <div className="footer-links">
                    <div className="row">
                        <div className="col-6 col-sm-6 text-center">                    
                            <NavLink to={`/gift`} className="btn btn-warning btn-subscriptions">{t('subscription')}</NavLink>                    
                        </div>
                        <div className="col-6 col-sm-6 text-center">                    
                            <NavLink to={`/store`} className="btn btn-warning btn-store">{t('bookstore')}</NavLink>                    
                        </div>
                    </div>  
                </div>
                <div className="splash-footer">   
                    <div className="container footer-container links">
                        <div className="d-flex justify-content-around w-100">
                            <div className="align-self-center">
                                <NavLink to={`/`}><CldImage className="img-logo" src="BZabc_logo_top.png" alt="GravityBrain" /></NavLink>
                            </div>                        
                            <div className="align-self-center text-center">
                                <NavLink to={`/privacy-policy.html`} className="btn radius-0 p-0 m-0">{t('privacy')}</NavLink>
                            </div> 
                            <div className="align-self-center text-center">
                                <NavLink to={`/terms`} className="btn radius-0 p-0 m-0">{t('terms')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashFooter