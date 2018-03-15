import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import bz from '../../../../media/images/bz.jpg'
import teacher from '../../../../media/images/teacher.jpg'
import Card from "../../../../components/ui/Card";


export default class QuickLink extends Component {

  render() {
    return (
      <div>

        <div className='m-portlet m-portlet--head-solid-bg quick-card-title'>
          <div className='m-portlet__head border-b-orange'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                <h3 className='m-portlet__head-text'>
                  Quick Links
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="small-card-content">
          <div className="small-card">
            <div className="row">
              <div className="col-6">
                <div className="">
                    <span className="quick-card-item m--font-brand">
                        <img src={bz} alt=""/>
                    </span>
                </div>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="m--align-right quick-link-title">
                    <h5 className="text-left">Student App</h5>
                    <span className="">Download</span>
                  </div>
                </div>

                <div className="row d-flex justify-content-end">
                    <span className="m-widget1__number m--font-brand">
                      <i className="fa fa-download  widget-icon quick-link-download"></i>
                    </span>
                </div>

              </div>
            </div>

          </div>
          <div className="small-card">

            <div className="row">
              <div className="col-6">
                <div className="">
                    <span className="quick-card-item m--font-brand">
                        <img src={teacher} alt=""/>
                    </span>
                </div>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="m--align-right quick-link-title">
                    <h5 className="text-left">How-To</h5>
                    <span className="">Movies</span>
                  </div>
                </div>

                <div className="row d-flex justify-content-end">
                    <span className="m-widget1__number m--font-brand">
                      <i className="fa fa-film  widget-icon quick-link-film"></i>
                    </span>
                </div>
              </div>

            </div>

          </div>
        </div>






      </div>


    );
  }
}
