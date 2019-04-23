import React, {Component} from 'react';
import {translate} from "react-i18next";
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
                    <div>
                        <span className="pull-left m--margin-10">
                            <AppLink type="students"><img src={bz} alt="" /></AppLink>
                        </span>
                        <div className="pull-left m--align-right quick-link-title m--margin-left-20 m--margin-top-20">
                            <span className="pull-right m--margin-left-20">
                                <i className="fa fa-download display-3 quick-link-download"></i>
                            </span>                  
                            <span className="pull-left m--margin-top-10">
                                <h5 className="text-left">{t('studentApp')}</h5>
                                <h3 className="text-left"><AppLink type="students">{t('download')}</AppLink></h3>
                            </span>
                        </div>                       
                    </div>            
                </div>
                <div className="small-card">
                    <div>
                        <span className="pull-left m--margin-10">
                            <img src={teacher} alt="" />
                        </span>
                        <div className="pull-left m--align-right quick-link-title m--margin-left-20 m--margin-top-20">
                            <span className="pull-right m--margin-left-20">
                                <i className="fa fa-film display-3 quick-link-film"></i>
                            </span>                  
                            <span className="pull-left m--margin-top-10">
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

export default translate('translations')(QuickLink);
