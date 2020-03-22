import React from "react";
import { withTranslation } from "react-i18next";
import SplashHeader from "./SplashHeader";
import SplashFooter from "./SplashFooter";
import SplashJumbotron from "./SplashJumbotron";
import "../../../styles/splash.css";

const SplashWrapper = props => {
  const minHeight = window.document.documentElement.clientHeight - 273;

  return (
    <div className="splash">
      <SplashHeader {...props} />
      {props.showJumbotron && <SplashJumbotron {...props} />}
      <section
        className={`${props.className || "splash-section"}`}>
        <div className="container" style={{ minHeight: minHeight }}>
          {props.children}
        </div>
        <SplashFooter {...props} />
      </section>
    </div>
  );
};

export default withTranslation("splashScreen")(SplashWrapper);
