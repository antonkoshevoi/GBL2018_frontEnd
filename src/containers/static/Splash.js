import React from 'react';
import {NavLink} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import SplashWrapper from './sections/SplashWrapper';
import SplashSlider from './sections/SplashSlider';
import CldImage from '../../components/ui/CldImage';

const SplashContainer = props => {
    const { t } = props;
    
    return (<SplashWrapper showJumbotron>        
        <div>
            <section className="welcome">                
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-6 m-auto">
                        <h1 className="section-head">{t('welcomeToWebsite')}</h1>
                    </div>
                </div>                
                <div className="row">
                    <div className="col12"><p className="about-us-note">{t('aboutUsNote')}</p></div>
                    <div className="col-sm-6 col-md-3">
                        <div className="image">
                            <CldImage src="video_image-about.png" alt={t('overview')} />
                            <a href="#overview"><CldImage src="BZabc-video_button.svg" alt={t('overview')} /></a>
                        </div>
                        <h5 className="text-center">
                            <button className="btn-link">{t('overview')}</button>
                        </h5>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="image">
                            <CldImage src="video_image-method.png" alt={t('usingOurProduct')}/>
                            <a href="#using-our-product"><CldImage src="BZabc-video_button.svg" alt={t('usingOurProduct')} /></a>
                        </div>
                        <h5 className="text-center">
                            <button className="btn-link">{t('usingOurProduct')}</button>   
                        </h5>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="image">
                            <CldImage src="video_image-using.png" alt={t('methods')}/>
                            <a href="#methodology"><CldImage src="BZabc-video_button.svg" alt={t('methods')} /></a>
                        </div>
                        <h5 className="text-center">
                            <NavLink to="methodology" className="btn-link">{t('methods')}</NavLink>
                        </h5>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="image">
                            <CldImage src="video_image-quickstart.png" alt={t('quickstart')}/>
                            <a href="#quickstart"><CldImage src="BZabc-video_button.svg" alt={t('quickstart')} /></a>
                        </div>
                        <h5 className="text-center">
                            <button className="btn-link">{t('quickstart')}</button>
                        </h5>
                    </div>
                </div>
            </section>
            <section className="methods">                
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-6 m-auto">
                        <h1 className="section-head">{t('ourMethod')}</h1>
                    </div>
                </div>                
                <div className="row methods-row">
                    <div className="col-sm-12 col-md-6">
                        <div className="method">
                            <h2>
                                {t('practicalSkillDevelopment')}
                            </h2>
                            <div className="image">
                                <CldImage src="BZabc_method_1.png" alt={t('practicalSkillDevelopment')} />
                                <a href="#practical-skill-development"><CldImage src="bzabc_document-button.svg" alt={t('practicalSkillDevelopment')} /></a>
                            </div>
                            <div className="method-description pre-line">
                            {t('practicalSkillDevelopmentDescription')}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="method">
                            <h2>
                                {t('consistency')}
                            </h2>
                            <div className="image">
                                <CldImage src="BZabc_method_2.png" alt={t('consistency')} />
                                <a href="#consistency-description"><CldImage src="bzabc_document-button.svg" alt={t('consistency')} /></a>
                            </div>
                            <div className="method-description pre-line">
                                {t('consistencyDescription')}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="method">
                            <h2>
                                {t('totalPhysicalResponse')}
                            </h2>
                            <div className="image">
                                <CldImage src="BZabc_method_3.png" alt={t('totalPhysicalResponse')} />
                                <a href="#total-physical-response-description"><CldImage src="bzabc_document-button.svg" alt={t('totalPhysicalResponse')} /></a>
                            </div>
                            <div className="method-description pre-line">
                            {t('totalPhysicalResponseDescription')}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="method">
                            <h2>                            
                                {t('dailyPractice')}
                            </h2>
                            <div className="image">
                                <CldImage src="BZabc_method_4.png" alt={t('dailyPractice')}/>
                                <a href="#daily-practice-description"><CldImage src="bzabc_document-button.svg" alt={t('dailyPractice')} /></a>
                            </div>
                            <div className="method-description pre-line">
                            {t('dailyPracticeDescription')}
                            </div>                            
                        </div>                        
                    </div>                    
                </div>                
            </section>
            <section className="tech-specs">                
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-6 m-auto">
                        <h1 className="section-head">{t('techSpecs')}</h1>
                    </div>
                </div>
                <div className="row tech-specs-row">
                    <div className="col-sm-12 col-md-6">
                        <div className="tech-spec">
                            <h2>{t('forAllPlatforms')}</h2>
                            <div className="imFor All Platfoage text-center">
                                <CldImage src="BZabc-tech-specs-platforms.png" alt="forAllPlatforms"/>
                            </div>
                            <div className="tech-spec-description pre-line">
                                {t('forAllPlatformsDescription')}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="tech-spec">
                            <h2>{t('blendedLearning')}</h2>
                            <div className="image text-center">
                                <CldImage src="BZabc_techspecs_blended.png" alt="blendedLearning"/>
                            </div>
                            <div className="tech-spec-description pre-line">
                                {t('blendedLearningDescription')}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="tech-spec">
                            <h2>{t('personalGuidance')}</h2>
                            <div className="image text-center">
                                <CldImage src="BZabc_techspecs_guidance.png" alt="personalGuidance"/>
                            </div>
                            <div className="tech-spec-description pre-line">
                                {t('personalGuidanceDescription')}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="tech-spec">
                            <h2>{t('trackingReporting')}</h2>
                            <div className="image text-center">
                                <CldImage src="BZabc_techspecs_tracking.png" alt="trackingReporting"/>
                            </div>
                            <div className="tech-spec-description pre-line">
                                {t('trackingReportingDescription')}
                            </div>                            
                        </div>                        
                    </div>                    
                </div>                
            </section>                        
            <SplashSlider {...props} />                                  
        </div>                
    </SplashWrapper>);
}

export default withTranslation('splashScreen')(SplashContainer);