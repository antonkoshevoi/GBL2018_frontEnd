import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import classRoomSvg from '../../../../media/images/classroom.svg';


export default class LinksWidgets extends Component {

    render() {
        return (
          <div className="small-card-content" id="g-widgets">

              <div className="small-card">
                  <div className="row m--full-height  m--padding-right-10 m--padding-left-10 align-items-center">
                      <div className=" col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                      <i className="fa fa-film widget-icon"></i>
                    </span>
                      </div>
                      <div className="col-sm-9 m--align-right">
                          <h5 className="m-widget1__title">How-To</h5>
                          <span className="widget-desc">Movies</span>
                      </div>
                  </div>
              </div>

              <div className="small-card">
                  <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                      <div className=" col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                      <img width={70} src={classRoomSvg} alt="svg"/>
                    </span>
                      </div>
                      <div className="col-sm-9 m--align-right">
                          <span className="widget-desc">Professional</span>
                          <h5 className="m-widget1__title">Training</h5>
                      </div>
                  </div>
              </div>

              <div className="small-card">
                  <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                      <div className="  col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                      <i className="fa fa-share-alt widget-icon"></i>
                    </span>
                      </div>
                      <div className="col-sm-9 m--align-right ">
                          <h5 className="m-widget1__title">Sharing</h5>
                          <span className="widget-desc">Messages, Chats, +</span>
                      </div>
                  </div>
              </div>

              <div className="small-card">
                  <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                      <div className="col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                        <i className="fa fa-id-card widget-icon"></i>
                    </span>
                      </div>
                      <div className="col-sm-9 m--align-right">
                    <span className="widget-desc">Student Centered <br/>
                      Planning and assessment
                    </span>
                          <h5 className="m-widget1__title">S-CAP</h5>
                      </div>
                  </div>
              </div>

          </div>
        );
    }
}
