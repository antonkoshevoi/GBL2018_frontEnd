import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import posterImage from "../../media/images/menu_poster.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Messages from "./Messages";
import Notifications from "./Notifications";

class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpened:false,
            activePusherMenu:null,
            tabIndex: 0
        };


    }


    render() {
        return (
          <div className="tab-content">
              <div className="tab-pane active show">
                  <div className="m-widget1 m-widget1--paddingless">
                      <div className="m-widget1__item">
                          <div className="row m-row--no-padding align-items-center">
                              <div className="task-info">
                                  <span>Generating Sales Report</span>
                                  <span className="pull-right">50%</span>
                              </div>
                              <div className="progress">
                                  <div className="progress-bar bg-info" role="progressbar" style={{width: '50%'}}></div>
                              </div>
                          </div>
                      </div>

                      <div className="m-widget1__item">
                          <div className="row m-row--no-padding align-items-center">
                              <div className="task-info">
                                  <span>Importing Contacts</span>
                                  <span className="pull-right">40%</span>
                              </div>
                              <div className="progress">
                                  <div className="progress-bar bg-info" role="progressbar" style={{width: '40%'}}></div>
                              </div>
                          </div>
                      </div>
                      <div className="m-widget1__item">
                          <div className="row m-row--no-padding align-items-center">
                              <div className="task-info">
                                  <span>Importing Contacts</span>
                                  <span className="pull-right">85%</span>
                              </div>
                              <div className="progress">
                                  <div className="progress-bar bg-info" role="progressbar" style={{width: '85%'}}></div>
                              </div>
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

export default translate("Tasks")
(connect(
    mapStateToProps,
)(Tasks));

