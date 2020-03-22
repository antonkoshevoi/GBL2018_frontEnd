import React, { PureComponent } from "react";
import {NavLink} from "react-router-dom";
import {Trans} from "react-i18next";
import {connect} from 'react-redux';
import {selectGetRecordRequest} from '../../../redux/subscriptions/selectors';
import {getRecord} from '../../../redux/subscriptions/actions';
import {Price} from '../../../components/ui/Price';
import CldImage from "../../../components/ui/CldImage";

class SplashJumbotron extends PureComponent {
  
    constructor(props) {
        super(props);
        this.state = {
            subscription: null
        };
    }
    
    componentDidMount() {        
        const {getRecord} = this.props;        
        getRecord(1);
    }
    
    componentDidUpdate(prevProps) {
        const success = this.props.getRecordRequest.get('success');        

        if (success && !prevProps.getRecordRequest.get('success')) {               
            this.setState({subscription: this.props.getRecordRequest.get('record')});
        }       
    }
    
  render() {
    const { t } = this.props;
    const { subscription } = this.state;
    return (
      <div className="clearfix">
        <div className="d-none d-md-block main-banner">
          <div className="container">
            <div className="main-image">              
              <div className="main-image-text">
                <h1>{t("giveGiftOfLearning")}</h1>
                <h2>{t("professionallyDesignedCourses")}</h2>                
                <div className="splash-points d-flex flex-column align-items-end">
                  <ul>
                    <li>{t("splashBannerPoint1")}</li>
                    <li>{t("splashBannerPoint2")}</li>
                    <li>{t("splashBannerPoint3")}</li>
                    <li>{t("splashBannerPoint4")}</li>
                    <li>{t("splashBannerPoint5")}</li>
                  </ul>
                
                <div className="main-banner-buttons mb-5">
                  <div className="subscriptions">
                    <NavLink
                      to={`/gift`}
                      className="btn btn-warning btn-subscriptions"
                    >
                      {t("subscription")}
                    </NavLink>
                  </div>
                  {subscription && 
                  <div className=" starting-from-text">                   
                    <Trans i18nKey="splashScreen:subscriptionStartingFrom">
                      <Price price={subscription.get('priceMonthly')} currency={subscription.get('currency')} />
                    </Trans>
                  </div>}

                  <div className="bookstore">
                    <div className="book-store-title-image">
                      <CldImage alt="" src="bookstoretitle.png" />
                    </div>
                    <NavLink
                      to={`/store`}
                      className="btn btn-warning btn-store"
                    >
                      {t("bookstore")}
                    </NavLink>
                  </div>
                  <div className=" starting-from-text">
                    {t("workBooksAndDownloads")}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-block d-md-none main-banner" id="main-banner">
          <div className="container">
            <div className="main-image-text">
              <h1>{t("giveGiftOfLearning")}</h1>
              <h2>{t("professionallyDesignedCourses")}</h2>
            </div>
            <div className="row">
              <div className="col-6 col-sm-6">
                <CldImage alt="" src="BZabc-subscriptions.png" />
              </div>
              <div className="col-6 col-sm-6">
                <div className="button-box">
                  <NavLink
                    to={`/gift`}
                    className="btn btn-warning btn-subscriptions"
                  >
                    {t("subscription")}
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-sm-6">
                <CldImage alt="" src="bzabc-books.png" />
              </div>
              <div className="col-6 col-sm-6">
                <div className="button-box">
                  <NavLink to={`/store`} className="btn btn-warning btn-store">
                    {t("bookstore")}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
    (state) => ({        
        getRecordRequest: selectGetRecordRequest(state)
    }),
    (dispatch) => ({
        getRecord: (id) => dispatch(getRecord(id))
    })
)(SplashJumbotron);
