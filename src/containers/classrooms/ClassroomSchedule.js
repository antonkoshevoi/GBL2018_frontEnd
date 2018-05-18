import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, MenuItem, Select, Input, CircularProgress } from 'material-ui';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectGetSingleRecordRequest } from '../../redux/classrooms/selectors';
import { getSingleRecord } from '../../redux/classrooms/actions';
import HasPermission from "../middlewares/HasPermission";

class ClassroomSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classroom: {}
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;        
        const { getSingleRecord } = this.props;
        
        getSingleRecord(id);
    }

    componentWillReceiveProps(nextProps) {
        const record = this.props.getSingleRecordRequest.get('record');
        const nextRecord = nextProps.getSingleRecordRequest.get('record');

        if (!record && nextRecord) {
            this.setState({                
                classroom: nextRecord.toJS()
            });
        }
    }

    render() {
        const {getSingleRecordRequest} = this.props;
        const loading = getSingleRecordRequest.get('loading')
        
        return loading ? (
            <h2 className='text-center'><CircularProgress color='accent'/></h2>
          ) : (
                <div className='fadeInLeft  animated learning-areas'>
                    <div className='m-portlet m-portlet--head-solid-bg'>
                        <div className='m-portlet__head'>
                            <div className='m-portlet__head-caption'>
                                <div className='m-portlet__head-title'>
                                    <span className='m-portlet__head-icon'><i className='la la-user' style={{fontSize: '55px'}}></i></span>
                                    <h3 className='m-portlet__head-text'>
                                        {this.state.classroom.crmName} - ClassRoom Schedule 
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className='m-portlet__body'>
                            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                                <div className='row align-items-center'>
                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    ClassroomSchedule = connect(
            (state) => ({
            getSingleRecordRequest: selectGetSingleRecordRequest(state),
        }),
            (dispatch) => ({
            getSingleRecord: (id, params = {}) => {
                dispatch(getSingleRecord(id, params))
            }
        })
    )(ClassroomSchedule);

    export default ClassroomSchedule;