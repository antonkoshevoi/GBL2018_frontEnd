import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Drawer} from "material-ui";

class AppDownloadDrawer extends Component {

    state = {
        isOpen:false
    }

    toggleDrawer = (is_open) => () => {
        this.setState({
            isOpen: is_open,
        });
    };



    render() {
        return (
            <div>
                <button className="btn m-btn btn-brand m-btn--icon" onClick={this.toggleDrawer(true)}>
                     <span>
                        <i class="fa fa-download"></i>
                        <span>Download App</span>
                    </span>
                </button>
                <Drawer
                    anchor="bottom"
                    open={this.state.isOpen}
                    onClose={this.toggleDrawer(false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer( false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <div className="appDownloadDrawer">
                            <h1 className="drawerTitle">Student App!</h1>
                            <div className="actionButtons">
                                <button className="btn btn-success btn-lg m-btn 	m-btn m-btn--icon">
                                    <span>
										<i class="fa fa-android"></i>
										<span>Download App</span>
									</span>
                                </button>
                                <button className="btn btn-success btn-lg m-btn 	m-btn m-btn--icon">
                                    <span>
										<i class="fa fa-apple"></i>
										<span>Download App</span>
									</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>

        );
    }
}

AppDownloadDrawer.propTypes = {};

export default AppDownloadDrawer;
