import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import bz from '../../../media/images/bz.jpg'
import teacher from '../../../media/images/teacher.jpg'
import AppLink from '../../../components/ui/AppLink';

class QuickLink extends Component {

    render() {
        const {t, hideHeader} = this.props;
        return (
            <div className="small-card-content">
                {!hideHeader && <div className='block-header border-b-grey'>                                                      
                    <h3 className='m-portlet__head-text'>{t('quickLinks')}</h3>
                </div>}
                <div className="small-card">
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="m-3">
                            <AppLink type="students"><img src={bz} alt="" /></AppLink>
                        </span>
                        <div className="quick-link-title mx-1 mx-md-4">
                            <span className="pull-right ml-4">
                                <i className="fa fa-download display-3 quick-link-download"></i>
                            </span>                  
                            <span className="pull-left mt-3">
                                <h5 className="text-left">{t('studentApp')}</h5>
                                <h3 className="text-left"><AppLink type="students">{t('download')}</AppLink></h3>
                            </span>
                        </div>                       
                    </div>            
                </div>
                <div className="small-card">
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="m-3">
                            <img src={teacher} alt="" />
                        </span>
                        <div className="quick-link-title mx-1 mx-md-4">
                            <span className="pull-right ml-4">
                                <i className="fa fa-film display-3 quick-link-film"></i>
                            </span>                  
                            <span className="pull-left mt-3">
                                <h5 className="text-left">{t('howTo')}</h5>
                                <h3 className="text-left">{t('movies')}</h3>
                            </span>
                        </div>                       
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translations')(QuickLink);
