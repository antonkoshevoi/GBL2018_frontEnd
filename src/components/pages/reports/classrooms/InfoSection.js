import React, {Component} from 'react';
import * as AUTH from '../../../../services/AuthService'
import WD from  '../../../../data/Widgets';

class InfoSection extends Component {

    _renderRosterStats(stats) {
        return stats.map(function (item,i) {
            return (
                <li className="m-nav__item" key={i}>
                    <a href="?page=header/profile&amp;demo=default" className="m-nav__link m--padding-top-5 m--padding-bottom-5">
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

                    <div className="m-widget1 m-widget1--paddingless">
                        <ul className="m-nav m-nav--hover-bg m-portlet-fit--sides">
                             {this._renderRosterStats(WD.rosterStats)}
                        </ul>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding align-items-center">
                                <div className="col">
                                    <h3 className="m-widget1__title">PASS RATE</h3>
                                </div>
                            </div>
                        </div>
                    </div>

        );
    }
}

InfoSection.propTypes = {};

export default InfoSection;
