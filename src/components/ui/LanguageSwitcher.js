import React, { Component } from "react";
import { translate } from "react-i18next";
import {Menu, MenuItem} from "material-ui";

class LanguageSwitcher extends Component {
    constructor(props) {
        super(props);
        const { i18n } = this.props;
        this.state = {
            language: i18n.language,
            anchorEl: null
        };

    }


    componentWillMount() {
        const currentLanguage = localStorage.getItem('language');
        if (currentLanguage) {
            this._switchLanguage(currentLanguage)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ language: nextProps.i18n.language });
    }

    _openLanguageMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    _switchLanguage = (lang_code) => {
        const { i18n } = this.props;
        i18n.changeLanguage(lang_code);
        localStorage.setItem('language', lang_code);
        this.setState({ anchorEl: null });
    };

    render() {
        const { t } = this.props;


        return (
            <li className="m-nav__item">
                <a  className="m-nav__link m-dropdown__toggle pointer"
                    aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this._openLanguageMenu}
                >
                                                <span className="m-nav__link-icon">
													<i className="la la-globe m--margin-right-5 d-md-inline"></i>
                                                    <span>{t('language')}</span>
												</span>
                </a>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => {this._switchLanguage('en')}}>{t('en')}</MenuItem>
                    <MenuItem onClick={() => {this._switchLanguage('de')}}>{t('de')}</MenuItem>
                    <MenuItem onClick={() => {this._switchLanguage('fr')}}>{t('fr')}</MenuItem>
                </Menu>
            </li>
        );
    }
}

export default translate("LanguageSwitcher")(LanguageSwitcher);