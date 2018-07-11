import React, { Component } from "react";
import { translate } from "react-i18next";
import {Avatar, ListItemText, Menu, MenuItem} from '@material-ui/core';
import en_flag from '../../media/images/flags/gb.png';
import es_flag from '../../media/images/flags/es.png';
import fr_flag from '../../media/images/flags/fr.png';
import kr_flag from '../../media/images/flags/kr.png';
import ch_1_flag from '../../media/images/flags/cn.png';
import ch_2_flag from '../../media/images/flags/cn.png';

const languages = [
    {code:'en', img:en_flag},
    {code:'es', img:es_flag},
    {code:'fr', img:fr_flag},
    {code:'kr', img:kr_flag},
    {code:'ch_1', img:ch_1_flag},
    {code:'ch_2', img:ch_2_flag},
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


    _switchLanguage = (lang_code) => {
        const { i18n } = this.props;
        i18n.changeLanguage(lang_code);
                
        localStorage.setItem('language', lang_code);
        this.setState({ anchorEl: null });                
    };

    _renderLangsMenu(langs) {
        const { t } = this.props;
        const _self = this;
        return languages.map(function (item,i) {

            return (
               <MenuItem key={i} onClick={() => {_self._switchLanguage(item.code)}}>
                   <ListItemText   primary={t(item.code)} />
               </MenuItem>
           )
        })
    }

    render() {
        const  langs  = this.props.i18n.store.data;

        return (
            <div className={this.props.className ? this.props.className : 'm-nav__item'}>
                <a  className="m-nav__link m-dropdown__toggle pointer"
                    aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this._openLanguageMenu}
                >
                        <span className="m-nav__link-icon">
                            <i className="m--icon-font-size-lg5  fa fa-globe m--margin-right-5 d-md-inline"></i>
                        </span>
                </a>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this._closeLanguageMenu}
                >
                    {this._renderLangsMenu(langs)}

                </Menu>
            </div>
        );
    }
}

export default translate("languageSwitcher")(LanguageSwitcher);