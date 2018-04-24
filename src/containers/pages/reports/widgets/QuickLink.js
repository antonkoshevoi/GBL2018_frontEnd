import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import bz from '../../../../media/images/bz.jpg'
import teacher from '../../../../media/images/teacher.jpg'
import Card from "../../../../components/ui/Card";


export default class QuickLink extends Component {

  render() {
    const {style} = this.props;
    return (
      <div style={style ? style : {height:'80%'}} >

        <div className='m-portlet m-portlet--head-solid-bg quick-card-title quick-links-header quick-links-header-transparent'>
          <div className='m-portlet__head border-b-orange quick-links-header-border'>
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
          <div className="small-card quick-link-card">
            <div className="row">
              <div className="col-6 quick-link-image">
                <div>
                        <img src={bz} alt=""/>
                </div>
              </div>

              <div className="col-6 quick-link-text">
                <div className="row">
                  <div className="m--align-right quick-link-title">
                    <h5 className="text-left">Student App</h5>
                    <h3 className="text-left">Download</h3>
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
          <div className="small-card quick-link-card">

            <div className="row">
              <div className="col-6 quick-link-image">
                <img src={teacher} alt=""/>
              </div>

              <div className="col-6 quick-link-text">
                <div className="row">
                  <div className="m--align-right quick-link-title">
                    <h5 className="text-left">How-To</h5>
                    <h3 className="text-left">Movies</h3>
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
