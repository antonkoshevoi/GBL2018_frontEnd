import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import CldImage from '../../../components/ui/CldImage';

class SplashJumbotron extends PureComponent {
    
    render() {
        const {t} = this.props;
        return (
            <div className="clearfix">
                <div className="m--hidden-mobile main-banner">
                    <div className="container">
                        <h1>{t('giveGiftOfLearning')}</h1>
                        <h2>{t('professionallyDesignedCourses')}</h2>
                        <h3>{t('justForKids')}</h3>
                        <div className='main-image'>
                            <CldImage alt="" src="BZabc-top-image-big.png" />
                            <div className="bookstore">
                                <NavLink to={`/store`} className="btn btn-warning btn-store">{t('bookstore')}</NavLink>
                            </div>
                            <div className="subscriptions">
                                <NavLink to={`/gift`} className="btn btn-warning btn-subscriptions">{t('subscription')}</NavLink>
                                <div className="m--margin-top-10">{t('subscriptionStartingFrom')}</div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="m--hidden-desktop main-banner" id="main-banner">
                    <div className="container">
                        <h1>{t('giveGiftOfLearning')}</h1>
                        <h2>{t('professionallyDesignedCourses')}</h2>
                        <h3>{t('justForKids')}</h3>
                        <div className="row">
                            <div className="col-6 col-sm-6">
                                <CldImage alt="" src="BZabc-subscriptions.png" />
                            </div>
                            <div className="col-6 col-sm-6">
                                <div className="button-box">
                                    <NavLink to={`/gift`} className="btn btn-warning btn-subscriptions">{t('subscription')}</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-sm-6">                            
                                <CldImage alt="" src="bzabc-books.png" />                            
                            </div>
                            <div className="col-6 col-sm-6">
                                <div className="button-box">
                                    <NavLink to={`/store`} className="btn btn-warning btn-store">{t('bookstore')}</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
                <div className="app-download">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 text-left">
                                <h3>{t('appDownloadCenter')}</h3>
                                <div className="description">
                                    {t('appDownloadCenterDescription')}
                                    &nbsp;
                                    <a href="/">{t('more')}</a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-5 text-right">
                                <div className="applications">
                                    <div>
                                        <CldImage src="bzabc_kids_icon_88px.png" alt="BZabc Kids" />
                                        <p>{t('kidsApp')}</p>
                                    </div>
                                    <div>
                                        <CldImage src="bzabc_parents_icon_88px.png" alt="BZabc Parents" />
                                        <p>{t('parentsApp')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashJumbotron


