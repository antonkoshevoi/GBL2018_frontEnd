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
                
        let footerHeight = document.getElementById('footer').clientHeight;
        let headerHeight = ((document.getElementById('main-banner') && document.getElementById('main-banner').clientHeight) || 0) + footerHeight;
        let position = this.state.footerPosition;
                
        console.log(window.scrollY - headerHeight);        
        console.log(footerHeight);
        
        position = window.scrollY - headerHeight;
        
        if (position > 0) {
            position = 0;
        }                    
        this.setState({footerPosition: position});        
    }
    
    render() {
        const {t} = this.props;
        
        return (
            <div id="footer" style={{bottom: this.state.footerPosition}}>
                <div class="footer-links">
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
                        <div className="row">
                            <div className="col-3 col-sm-4">
                                <NavLink to={`/`}><CldImage className="img-logo" src="BZabc_logo_top.png" alt="GravityBrain" /></NavLink>
                            </div>                        
                            <div className="col-4 col-sm-4 text-center">
                                <NavLink to={`/privacy-policy.html`} className="btn no-border">{t('privacy')}</NavLink>
                            </div> 
                            <div className="col-5 col-sm-4 text-center">
                                <NavLink to={`/terms`} className="btn no-border">{t('terms')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashFooter