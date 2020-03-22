import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";

import { AppBar, Tabs, Tab } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SplashSlider from "./sections/SplashSlider";
import AppLink from "../../components/ui/AppLink";
import CldImage from "../../components/ui/CldImage";
import SplashWrapper from "./sections/SplashWrapper";

import videoIcon from '../../media/images/video-icon.png'
import pdfIcon from '../../media/images/pdf-icon.png'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

class SplashContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }
  setValue = newValue => {
    this.setState({ value: newValue });
  };

  handleChange = (event, newValue) => {
    this.setValue(newValue);
  };

  render() {
    const { t } = this.props;

    return (
      <SplashWrapper showJumbotron>        
        <div className="splash-tabs">
          <div className="container">
            <AppBar position="static">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
              >
                <Tab label={t("platformOverview")} {...a11yProps(0)} />
                <Tab label={t("schoolsTeachers")} icon={<span className="schools-teachers" />} {...a11yProps(1)} />
                <Tab label={t("parentsStudents")} icon={<span className="parents-students" />} {...a11yProps(2)} />
                <Tab label={t("publishersTab")} {...a11yProps(3)} />
              </Tabs>
            </AppBar>    
          </div>
        </div>
        <div className="app-download">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-left pr-3">
                <h3>{t("appDownloadCenter")}</h3>
                <div className="description">
                  {t("appDownloadCenterDescription")}
                </div>
              </div>
                <div className="applications d-sm-flex justify-content-around align-items-center">
                  <div>
                    <AppLink type="students">
                      <CldImage
                        src="bzabc_kids_icon_88px.png"
                        alt="BZabc Kids"
                      />
                    </AppLink>
                    <p>
                      <AppLink type="students">{t("kidsApp")}</AppLink>
                    </p>
                  </div>
                  <div>
                    <AppLink type="parents">
                      <CldImage
                        src="bzabc_parents_icon_88px.png"
                        alt="BZabc Parents"
                      />
                    </AppLink>
                    <p>
                      <AppLink type="parents">{t("parentsApp")}</AppLink>
                    </p>
                  </div>                
              </div>
            </div>
          </div>
        </div>      
        <div className="pt-4">
          <TabPanel value={this.state.value} index={0}>
            <section className="welcome">
              <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-6 m-auto">
                  <h1 className="section-head mt-5">{t("welcomeToWebsite")}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col12">
                  <p className="about-us-note">{t("aboutUsNote")}</p>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="image">
                    <CldImage src="video_image-about.png" alt={t("overview")} />
                    <a href="#overview">
                      <CldImage
                        src="BZabc-video_button.svg"
                        alt={t("overview")}
                      />
                    </a>
                  </div>
                  <h5 className="text-center">
                    <button className="btn-link">{t("overview")}</button>
                  </h5>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="image">
                    <CldImage
                      src="video_image-method.png"
                      alt={t("usingOurProduct")}
                    />
                    <a href="#using-our-product">
                      <CldImage
                        src="BZabc-video_button.svg"
                        alt={t("usingOurProduct")}
                      />
                    </a>
                  </div>
                  <h5 className="text-center">
                    <button className="btn-link">{t("usingOurProduct")}</button>
                  </h5>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="image">
                    <CldImage src="video_image-using.png" alt={t("methods")} />
                    <a href="#methodology">
                      <CldImage
                        src="BZabc-video_button.svg"
                        alt={t("methods")}
                      />
                    </a>
                  </div>
                  <h5 className="text-center">
                    <NavLink to="methodology" className="btn-link">
                      {t("methods")}
                    </NavLink>
                  </h5>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="image">
                    <CldImage
                      src="video_image-quickstart.png"
                      alt={t("quickstart")}
                    />
                    <a href="#quickstart">
                      <CldImage
                        src="BZabc-video_button.svg"
                        alt={t("quickstart")}
                      />
                    </a>
                  </div>
                  <h5 className="text-center">
                    <button className="btn-link">{t("quickstart")}</button>
                  </h5>
                </div>
              </div>
            </section>
            <section className="methods">
              <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-6 m-auto">
                  <h1 className="section-head">{t("ourMethod")}</h1>
                </div>
              </div>
              <div className="row methods-row">
                <div className="col-sm-12 col-md-6">
                  <div className="method">
                    <h2>{t("practicalSkillDevelopment")}</h2>
                    <div className="image">
                      <CldImage
                        src="BZabc_method_1.png"
                        alt={t("practicalSkillDevelopment")}
                      />
                      <a href="#practical-skill-development">
                        <CldImage
                          src="bzabc_document-button.svg"
                          alt={t("practicalSkillDevelopment")}
                        />
                      </a>
                    </div>
                    <div className="method-description pre-line">
                      {t("practicalSkillDevelopmentDescription")}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="method">
                    <h2>{t("consistency")}</h2>
                    <div className="image">
                      <CldImage
                        src="BZabc_method_2.png"
                        alt={t("consistency")}
                      />
                      <a href="#consistency-description">
                        <CldImage
                          src="bzabc_document-button.svg"
                          alt={t("consistency")}
                        />
                      </a>
                    </div>
                    <div className="method-description pre-line">
                      {t("consistencyDescription")}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="method">
                    <h2>{t("totalPhysicalResponse")}</h2>
                    <div className="image">
                      <CldImage
                        src="BZabc_method_3.png"
                        alt={t("totalPhysicalResponse")}
                      />
                      <a href="#total-physical-response-description">
                        <CldImage
                          src="bzabc_document-button.svg"
                          alt={t("totalPhysicalResponse")}
                        />
                      </a>
                    </div>
                    <div className="method-description pre-line">
                      {t("totalPhysicalResponseDescription")}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="method">
                    <h2>{t("dailyPractice")}</h2>
                    <div className="image">
                      <CldImage
                        src="BZabc_method_4.png"
                        alt={t("dailyPractice")}
                      />
                      <a href="#daily-practice-description">
                        <CldImage
                          src="bzabc_document-button.svg"
                          alt={t("dailyPractice")}
                        />
                      </a>
                    </div>
                    <div className="method-description pre-line">
                      {t("dailyPracticeDescription")}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="tech-specs">
              <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-6 m-auto">
                  <h1 className="section-head">{t("techSpecs")}</h1>
                </div>
              </div>
              <div className="row tech-specs-row">
                <div className="col-sm-12 col-md-6">
                  <div className="tech-spec">
                    <h2>{t("forAllPlatforms")}</h2>
                    <div className="imFor All Platfoage text-center">
                      <CldImage
                        src="BZabc-tech-specs-platforms.png"
                        alt="forAllPlatforms"
                      />
                    </div>
                    <div className="tech-spec-description pre-line">
                      {t("forAllPlatformsDescription")}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="tech-spec">
                    <h2>{t("blendedLearning")}</h2>
                    <div className="image text-center">
                      <CldImage
                        src="BZabc_techspecs_blended.png"
                        alt="blendedLearning"
                      />
                    </div>
                    <div className="tech-spec-description pre-line">
                      {t("blendedLearningDescription")}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="tech-spec">
                    <h2>{t("personalGuidance")}</h2>
                    <div className="image text-center">
                      <CldImage
                        src="BZabc_techspecs_guidance.png"
                        alt="personalGuidance"
                      />
                    </div>
                    <div className="tech-spec-description pre-line">
                      {t("personalGuidanceDescription")}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="tech-spec">
                    <h2>{t("trackingReporting")}</h2>
                    <div className="image text-center">
                      <CldImage
                        src="BZabc_techspecs_tracking.png"
                        alt="trackingReporting"
                      />
                    </div>
                    <div className="tech-spec-description pre-line">
                      {t("trackingReportingDescription")}
                    </div>
                  </div>
                </div>
              </div>
            </section>            
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <div className="d-flex justify-content-between">
              <div>
                <p className="p-text">{t("schoolsAndTeachersText1")}</p>
                <p className="p-text">{t("schoolsAndTeachersText2")}</p>
                <div className="p-text">
                  <p>{t("schoolsAndTeachersText3")}</p>
                  <ul>
                    <li>{t("schoolsAndTeachersText31")}</li>
                    <li>{t("schoolsAndTeachersText32")}</li>
                    <li>{t("schoolsAndTeachersText33")}</li>
                    <li>{t("schoolsAndTeachersText34")}</li>
                    <li>{t("schoolsAndTeachersText35")}</li>
                    <li>{t("schoolsAndTeachersText36")}</li>
                    <li>{t("schoolsAndTeachersText37")}</li>
                  </ul>
                </div>              
              </div>
              <div>
                <div className="download-tool p-3 my-4">
                    <div className="text-center text-nowrap mt-2">
                      <a alt="" href="#" className="mx-4"><img style={{maxWidth: '60px'}} src={videoIcon} /></a>
                      <a alt="" href="#" className="mx-4"><img style={{maxWidth: '60px'}} src={pdfIcon} /></a>
                    </div>
                    <h4 className="text-center text-nowrap mt-3 mb-0">{t('schoolWebTool')}</h4>
                </div>
                <div className="download-tool p-3">
                    <div className="text-center text-nowrap mt-2">
                      <a alt="" href="#" className="mx-4"><img style={{maxWidth: '60px'}} src={videoIcon} /></a>
                      <a alt="" href="#" className="mx-4"><img style={{maxWidth: '60px'}} src={pdfIcon} /></a>
                    </div>
                    <h4 className="text-center text-nowrap mt-3 mb-0">{t('gettingStarted')}</h4>
                </div>          
              </div>
            </div>
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            <p className="p-text">{t("studenstAndParents1")}</p>
            <p className="p-text">{t("studenstAndParents2")}</p>
            <p className="p-text">{t("studenstAndParents3")}</p>
            <div className="p-text">
              <p>{t("studenstAndParents4")}</p>
              <ul>
                <li> {t("studenstAndParents41")}</li>
                <li>{t("studenstAndParents42")}</li>
                <li> {t("studenstAndParents43")}</li>
                <li>{t("studenstAndParents44")}</li>
              </ul>
            </div>
            <div className="p-text">
              <p>{t("studenstAndParents5")}</p>
              <ul>
                <li> {t("studenstAndParents51")}</li>
                <li>{t("studenstAndParents52")}</li>
                <li> {t("studenstAndParents53")}</li>
                <li>{t("studenstAndParents54")}</li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            <p className="p-text">{t("publishersText1")}</p>
            <p className="p-text">{t("publishersText2")}</p>
            <p className="p-text">{t("publishersText3")}</p>
            <p className="p-text">{t("publishersText4")}</p>
            <p className="p-text"><Trans i18nKey="splashScreen:publishersText5"><a href='mailto:office@gravitybrain.com'>office@gravitybrain.com</a>.</Trans></p>
          </TabPanel>
        </div>
        <SplashSlider {...this.props} />       
      </SplashWrapper>
    );
  }
}

export default withTranslation("splashScreen")(SplashContainer);
