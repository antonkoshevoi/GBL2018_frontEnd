import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';

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
                        <img alt="" src="//d2cnhr6egzpvdl.cloudfront.net/image/bzabc/BZabc-top-image-big.png" />
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
            <div className="app-download">
                <div className="container">
                    <div className="row">
                        <div className="col6 col-sm-7 text-left">
                            <h3>{t('appDownloadCenter')}</h3>
                            <div className="description">
                                {t('appDownloadCenterDescription')}
                                &nbsp;
                                <a href="/">{t('more')}</a>
                            </div>
                        </div>
                        <div className="col6 col-sm-5 text-right">
                            <div class="applications">
                                <div>
                                    <img src="//d2cnhr6egzpvdl.cloudfront.net/image/bzabc/bzabc_kids_icon_88px.png" alt="BZabc Kids" />
                                    <p>{t('kidsApp')}</p>
                                </div>
                                <div>
                                    <img src="//d2cnhr6egzpvdl.cloudfront.net/image/bzabc/bzabc_parents_icon_88px.png" alt="BZabc Parents" />
                                    <p>{t('parentsApp')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default SplashJumbotron


