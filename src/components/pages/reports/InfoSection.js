import React, {Component} from 'react';
import * as AUTH from '../../../services/AuthService'
import WD from  '../../../data/Widgets';

class InfoSection extends Component {

    _renderRosterStats(stats) {
        return stats.map(function (item,i) {
            return (
                <li className="m-nav__item" key={i}>
                    <a href="?page=header/profile&amp;demo=default" className="m-nav__link">
                        <span className="m-nav__link-title">
								<span className="m-nav__link-wrap">
									<span className="m-nav__link-text">{item.title}</span>
									<span className="m-nav__link-badge"><span className={`m-badge m-badge--${item.colorName}`}>{item.value}</span></span>
								</span>
							</span>
                    </a>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="m-portlet m-portlet--full-height  ">
                <div className="m-portlet__body">
                    <div className="m-card-profile">
                        <div className="m-card-profile__title m--hide">
                            Your Profile
                        </div>
                        <div className="m-card-profile__pic">
                            <div className="m-card-profile__pic-wrapper">
                                <img src={AUTH.user().avatar} alt=""/>
                            </div>
                        </div>
                        <div className="m-card-profile__details">
                            <span className="m-card-profile__name">{AUTH.user().firstName + ' ' + AUTH.user().lastName}</span>
                            <a href="" className="m-card-profile__email m-link">School N183</a>
                        </div>
                    </div>
                    <ul className="m-nav m-nav--hover-bg m-portlet-fit--sides">
                        <li className="m-nav__separator m-nav__separator--fit"></li>
                        <li className="m-nav__section m--hide">
                            <span className="m-nav__section-text">Section</span>
                        </li>

                        {this._renderRosterStats(WD.rosterStats)}

                    </ul>

                    <div className="m-portlet__body-separator"></div>

                    <div className="m-widget1 m-widget1--paddingless">
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding align-items-center">
                                <div className="col">
                                    <h3 className="m-widget1__title">PASS RATE</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__number m--font-brand">28%</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

InfoSection.propTypes = {};

export default InfoSection;
