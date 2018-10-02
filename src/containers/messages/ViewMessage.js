import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetRecordRequest } from '../../redux/messages/selectors';
import { getMessage } from '../../redux/messages/actions';
import { push } from 'react-router-redux';
import { MenuItem, Select } from '@material-ui/core';
import Loader from "../../components/layouts/Loader";
import NotFoundPage from '../errors/404';
import moment from "moment/moment";

class ViewMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        const {getRecord} = this.props;
        getRecord(this.state.id);
    }        


    render() {
        const {getRecordRequest, t} = this.props;
        const {page, perPage} = this.state;
        const loading = getRecordRequest.get('loading');
        const success = getRecordRequest.get('success');
        const data = getRecordRequest.get('record');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o' style={{fontSize: '55px'}}></i></span>
                                <h3 className='m-portlet__head-text'>{t('viewMessage')}</h3>
                            </div>
                        </div>         
                    </div>
                    {loading && <Loader />}
                    {success &&
                    <div className='m-portlet__body'>
                        <div className="row">
                            <div className="col-sm-12">                              
                                <p className="pull-right">{moment(data.get('sent')).format('lll')}</p>
                                <h6>{t('subject')}</h6> 
                                <p>{data.get('subject')}</p>
                                <h6>{t('description')}</h6> 
                                <p className="pre-line">{data.get('body')}</p>
                                <h6>{t('type')}</h6>
                                <p>
                                    <span className={`m-badge m-badge--brand m-badge--wide ${(data.get('type') === 'alert' ? 'm-badge--warning' : '')}`}>{t(data.get('type'))}</span>
                                </p>                                                                                                                                
                            </div>
                        </div>
                    </div>}
                </div>          
            </div>
        );
    }
}

ViewMessage = connect(
    (state) => ({
        getRecordRequest: selectGetRecordRequest(state)
    }),
    (dispatch) => ({
        getRecord: (params = {}) => {
            dispatch(getMessage(params));
        }
    })
)(ViewMessage);

export default translate('translations')(ViewMessage);