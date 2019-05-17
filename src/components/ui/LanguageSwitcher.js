import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Menu, MenuItem} from '@material-ui/core';

const languages = [
    'en',
    'es',
    'fr',
    'kr',
    'zh_hans',
    'zh_hant'
];

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

    _closeLanguageMenu = event => {        
        this.setState({ anchorEl: null });
    };


    _switchLanguage = (langCode) => {
        const { i18n } = this.props;
        i18n.changeLanguage(langCode);
        localStorage.setItem('language', langCode);
        this.setState({ anchorEl: null });                
    };

    _renderLangsMenu() {
        const { t } = this.props;
        const _self = this;
        return languages.map(function (item, i) {
            return  <MenuItem key={i} onClick={() => {_self._switchLanguage(item)}}>{t(item)}</MenuItem>;
        })
    }

    render() {        
        return ([
                <button key={0} className="m-nav__link m-dropdown__toggle pointer"
                    aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this._openLanguageMenu}
                >
                    <span className="m-nav__link-icon">
                        <i className="m--icon-font-size-lg2 fa fa-globe m--margin-right-5 d-md-inline"></i>
                    </span>
                </button>,
                <Menu
                    key={1}
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this._closeLanguageMenu}
                >
                    {this._renderLangsMenu()}
                </Menu>
        ]);
    }
}

export default withTranslation('translations')(LanguageSwitcher);