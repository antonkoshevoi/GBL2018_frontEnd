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
            <div className="about-us-header">
                <div className="container">{t('aboutUsNote')}</div>
            </div>
        </div>
    )
  }
}

export default SplashJumbotron


