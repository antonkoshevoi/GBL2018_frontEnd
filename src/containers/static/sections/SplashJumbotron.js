import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";

import CldImage from "../../../components/ui/CldImage";

class SplashJumbotron extends PureComponent {
  render() {
    const { t } = this.props;    
    return (
      <div className="clearfix">
        <div className="d-none d-md-block main-banner">
          <div className="container">
            <div className="main-image">
              <CldImage alt="" src="SplashMain.jpg" />
              <div className="main-image-text">
                <h1>{t("giveGiftOfLearning")}</h1>
                <h2>{t("professionallyDesignedCourses")}</h2>
                {/*<h3>{t("justForKids")}</h3>*/}
                <div className="splash-points">
                  <ul>
                    <li>{t("splashBannerPoint1")}</li>
                    <li>{t("splashBannerPoint2")}</li>
                    <li>{t("splashBannerPoint3")}</li>
                    <li>{t("splashBannerPoint4")}</li>
                    <li>{t("splashBannerPoint5")}</li>
                  </ul>
                </div>

                <div className="main-banner-buttons">
                  <div className="subscriptions">
                    <NavLink
                      to={`/gift`}
                      className="btn btn-warning btn-subscriptions"
                    >
                      {t("subscription")}
                    </NavLink>
                  </div>
                  <div className=" starting-from-text">
                    {t("subscriptionStartingFrom")}
                  </div>

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

export default SplashJumbotron;
