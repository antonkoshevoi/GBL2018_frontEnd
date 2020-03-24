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
        <div className="main-banner">
          <div className="container">
            <div className="main-banner-background pt-3 pt-sm-5 px-2">
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
                <div className="main-banner-buttons my-3 my-md-5 py-xl-5">
                  <div className="subscriptions mb-5 pb-3 pb-md-5">
                    <NavLink to={`/gift`} className="btn btn-warning btn-subscriptions">
                      {t("subscription")}
                    </NavLink>                  
                    {subscription && 
                    <div className="note mt-1 text-nowrap">                   
                      <Trans i18nKey="splashScreen:subscriptionStartingFrom">
                        <Price price={subscription.get('priceMonthly')} />
                      </Trans>
                    </div>}
                  </div>
                  <div className="bookstore mt-1">
                    <div className="book-store-title-image">
                      <CldImage alt="" src="bookstoretitle.png" />
                    </div>
                    <NavLink
                      to={`/store`}
                      className="btn btn-warning btn-store"
                    >
                      {t("bookstore")}
                    </NavLink>
                    <div className="note mt-1 text-nowrap">
                      {t("workBooksAndDownloads")}
                    </div>
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
