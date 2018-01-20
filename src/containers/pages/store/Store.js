import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Target} from "material-ui";
import Filter from "../../../components/pages/store/Filter";

class Store extends Component {



    render() {
        return (
            <div >
                <div className="m-portlet store-wrapper">
                    <div className="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                               <Filter/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("Store")(connect(
    mapStateToProps,
)(Store));

