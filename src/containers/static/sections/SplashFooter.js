import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';

class SplashFooter extends PureComponent {
    render() {
        const {t} = this.props;
        
        return (
            <div className="splash-footer">
                <div className="container footer-container links">
                    <div className="row">
                        <div className="col4 col-sm-4 text-center">
                            <NavLink to={`/privacy-policy.html`} className="btn no-border m-btn btn-sm ">{t('privacy')}</NavLink>
                        </div>
                        <div className="col4 col-sm-4 text-center">
                            <a href="https://pubtool.gravitybrain.com" className="btn no-border m-btn btn-lg">{t('publishers')}</a>
                        </div>
                        <div className="col4 col-sm-4 text-center">
                            <NavLink to={`/terms`} className="btn no-border m-btn btn-sm ">{t('terms')}</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashFooter