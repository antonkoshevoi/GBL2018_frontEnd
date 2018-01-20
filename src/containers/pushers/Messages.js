import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import posterImage from "../../media/images/menu_poster.jpg"
import {Avatar} from "material-ui";


class Messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpened:false
        };

    }

    _openMenu = event => {
        this.setState({ menuOpened: !this.state.menuOpened });
    };

    _closeMenu = event => {
        this.setState({ menuOpened: false });
    };

    render() {
        return (
            <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
                <a  className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={this._openMenu}>
                    <span className="m-nav__link-icon">
													<i className="fa fa-envelope"></i>
												</span>
                </a>
                {this.state.menuOpened &&
                <div className="m-dropdown__wrapper" onMouseLeave={this._closeMenu} style={{display: 'block'}}>
                    <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                    <div className="m-dropdown__inner">
                        <div className="m-dropdown__header m--align-center"
                             style={{backgroundImage: `url(${posterImage})`}}>
														<span className="m-dropdown__header-title">
															9 New
														</span>
                            <span className="m-dropdown__header-subtitle">
															Messages
														</span>
                        </div>
                        <div className="m-dropdown__body">
                            <div className="m-dropdown__content">

                                <div className="tab-content">
                                    <div className="tab-pane active show">
                                        <div class="m-widget1 m-widget1--paddingless">
                                            <div class="m-widget1__item">
                                                <div class="row m-row--no-padding align-items-center">
                                                    <div class="col-md-2 m--align-left">
                                                        <span class="m-widget1__number m--font-brand">
                                                            <Avatar src="https://www.usnews.com/dims4/USNEWS/90238a1/2147483647/thumbnail/652x435%3E/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F03%2Fa4%2Fc21e092747eb902379ae57eb9987%2F141030-pfcquizgraduate.jpg"/>
                                                        </span>
                                                    </div>
                                                    <div class="col">
                                                        <h3 class="m-widget1__title">Clara Fabian</h3>
                                                        <span class="m-widget1__desc">Lorem ipsum dolor sit amet.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="m-widget1__item">
                                                <div class="row m-row--no-padding align-items-center">
                                                    <div class="col-md-2 m--align-left">
                                                        <span class="m-widget1__number m--font-brand">
                                                            <Avatar src="http://www.acfe.com/uploadedImages/ACFE_Website/Content/images/membership-certification/graduate-member.jpg"/>
                                                        </span>
                                                    </div>
                                                    <div class="col">
                                                        <h3 class="m-widget1__title">Piter Pan</h3>
                                                        <span class="m-widget1__desc">Lorem ipsum dolor sit amet. Lorem ipsum.</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="m-widget1__item">
                                                <div class="row m-row--no-padding align-items-center">
                                                    <div class="col-md-2 m--align-left">
                                                        <span class="m-widget1__number m--font-brand">
                                                            <Avatar src="https://michiganross.umich.edu/sites/default/files/images/profiles/koustav-de.jpg"/>
                                                        </span>
                                                    </div>
                                                    <div class="col">
                                                        <h3 class="m-widget1__title">Patrick Shick</h3>
                                                        <span class="m-widget1__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis rerum, sequi.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </li>
        );
    }
}


function mapStateToProps(state) {
    return {};
}

export default translate("Messages")
(connect(
    mapStateToProps,
)(Messages));

