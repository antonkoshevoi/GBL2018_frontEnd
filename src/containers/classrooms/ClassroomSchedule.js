import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Select, MenuItem, FormHelperText, Radio, FormControlLabel } from '@material-ui/core';
import MuiDatePicker from '../../components/ui/MuiDatePicker';
import Loader from '../../components/layouts/Loader';
import { connect } from 'react-redux';
import { selectGetScheduleRequest, selectUpdateScheduleRequest } from '../../redux/classrooms/selectors';
import { getSchedule , updateSchedule} from '../../redux/classrooms/actions';
import AttemptDateForm from "./forms/AttemptDateForm";

class ClassroomSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleType: 'unit',
            days: 0,
            weeks: 0,
            startDate: null
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const { getSchedule } = this.props;
        
        getSchedule(id);
    }
        
    componentWillReceiveProps(nextProps) {
        const success       = this.props.updateScheduleRequest.get('success');
        const nextSuccess   = nextProps.updateScheduleRequest.get('success');
        const {id}          = this.props.match.params;
        const {getSchedule} = this.props;
        
        if (!success && nextSuccess) {
            this.setState({            
                scheduleType: 'unit',
                days: 0,
                weeks: 0,
                startDate: null          
            });
            
             getSchedule(id);
        }
    }
  
    _handleInputChange(event) {
        const { name, value } = event.target;
                
        this.setState({            
            ...this.state,        
            [name]: value            
        });
    }

    _handleDateChange(value, dateField) {
        this.setState({
            ...this.state,
            [dateField]: value
        });
    }    
    
    _saveSchedule() {
        const {id} = this.props.match.params;
        const {updateSchedule} = this.props;
    
        updateSchedule(id, this.state);
    }
    
    _renderUnits(units) {                
        const {t}   = this.props;
        const {id}  = this.props.match.params;
        
        return units.map((unit, unitIndex) => {
            
            let unitRowSpan = unit.lessons.length;
            let lessons      = unit.lessons;
            
            return lessons.map((lesson, lessonIndex) => {
                return <tr key={'row-' + unitIndex + '-' + lessonIndex }>
                    {!lessonIndex &&
                    <td className="rotate" width='50px' rowSpan={unitRowSpan} key={unit.unitId + '-unitName'}>
                        <div><span><b>{t('unit')} {unitIndex + 1}</b> {unit.unitName}</span></div>
                    </td>}
                    <td width='350px'>
                        <p className="text-center"><span className="badge badge-info">{t('unit')} {unitIndex + 1}, {t('lesson')} {lessonIndex + 1}</span> </p>                        
                        <p className="text-center"><span>{lesson.lessonName}</span></p>
                    </td>
                    <td width='450px'><p className="text-center">{lesson.lessonDescription}</p></td>
                    <td width='300px'>
                        <AttemptDateForm lesson={lesson} classroomId={id} />
                    </td>                    
                </tr>
            });
        });
    }    

    render() {
        const {getScheduleRequest, updateScheduleRequest, t} = this.props;
        
        const loaded    = getScheduleRequest.get('success');
        const schedule  = loaded ? getScheduleRequest.get('results').toJS() : {};
        const errors    = updateScheduleRequest.get('errors');
        const disabled  = updateScheduleRequest.get('loading');
        
        return (
            <div className='fadeInLeft  animated learning-areas'>
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-red'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-user'></i></span>
                                <h3 className='m-portlet__head-text'>
                                {loaded ? t('classRoomSchedule', {classroom: schedule.crmName}) : '...'}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className='m-portlet__body'>
                        <div className='m-form m-form--label-align-left mt-4 mb-4'>
                            <div className="row">                                       
                                <label className="col-lg-1 col-md-3 col-sm-4 mt-3">{t('scheduleBy')}:</label>
                                <div className="col-lg-4 col-md-5 col-sm-6">
                                    <div>
                                        <FormControlLabel 
                                            label={t('unit')}
                                            control={<Radio color="primary" name="scheduleType" checked={this.state.scheduleType === 'unit'} onChange={(e) => {this._handleInputChange(e)}} value="unit" />}          
                                        />                           
                                        <FormControlLabel 
                                            label={t('lesson')}
                                            control={<Radio color="primary" name="scheduleType" checked={this.state.scheduleType === 'lesson'} onChange={(e) => {this._handleInputChange(e)}} value="lesson" />}          
                                        />
                                    </div>
                                    {errors && errors.get('scheduleType') &&  <FormHelperText error>{errors.get('scheduleType').get(0)}</FormHelperText>}                                    
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-lg-1 col-md-3 col-sm-4 mt-3">{t('frequency')}:</label>
                                <div className="col-lg-4 col-md-5 col-sm-6">
                                    <div>
                                    <Select
                                    name="days"                                                
                                    value={this.state.days || 0}
                                    onChange={(e) => { this._handleInputChange(e) }} >
                                    <MenuItem value="0"></MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="6">6</MenuItem>
                                    <MenuItem value="7">7</MenuItem>
                                  </Select>
                                  <label className="col-lg-2 col-md-3 col-sm-4" htmlFor="days">{t('days')}</label>                     
                                    <Select
                                    name="weeks"                                                
                                    value={this.state.weeks || 0}
                                    onChange={(e) => { this._handleInputChange(e) }} >
                                    <MenuItem value="0"></MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                  </Select>
                                  <label className="col-lg-3" htmlFor="weeks">{t('weeks')}</label>
                                  </div>                                  
                                  {errors && errors.get('days') && <FormHelperText error>{errors.get('days').get(0)}</FormHelperText>}
                                  {errors && errors.get('weeks') && <FormHelperText error>{errors.get('weeks').get(0)}</FormHelperText>}
                                </div>                                            
                            </div>
                            <div className="row mt-3">
                                <label className="col-lg-1 col-md-3 col-sm-4 mt-3" htmlFor="startDate">{t('startDate')}:</label>
                                <div className="col-lg-4 col-md-5 col-sm-6">
                                    <div>
                                        <MuiDatePicker
                                            name='startDate'
                                            value={this.state.startDate || null}
                                            onChange={(e) => { this._handleDateChange(e, 'startDate') }}
                                        />
                                        <Button disabled={disabled} variant="contained" color='primary' onClick={() => { this._saveSchedule() }} className='mt-btn mt-btn-success ml-3'>Execute</Button>
                                    </div>
                                    {errors && errors.get('startDate') && <FormHelperText error>{errors.get('startDate').get(0)}</FormHelperText>}                                    
                                </div>                       
                            </div>                              
                        </div>   
                    </div>
                    <div className='m-portlet__body'>
                        <div className="table-responsive">
                        {loaded ?                                  
                        <table className="table table-bordered">
                            <thead>
                                <tr className="active">
                                    <th>{t('unit')}</th>
                                    <th className="text-center">{t('lessonTitle')}</th>
                                    <th className="text-center">{t('lessonDescription')}</th>
                                    <th className="text-center">{t('lessonAttempt')}</th>                                        
                                </tr>
                            </thead>
                            <tbody>                           
                                {this._renderUnits(schedule.units)}
                            </tbody>
                        </table> : <Loader/>}
                        </div>
                    </div>                                        
                </div>
            </div>
        );
    }    
}

ClassroomSchedule = connect(
    (state) => ({
        getScheduleRequest: selectGetScheduleRequest(state),
        updateScheduleRequest: selectUpdateScheduleRequest(state)
    }),
    (dispatch) => ({
        getSchedule: (id, params = {}) => {
            dispatch(getSchedule(id, params))
        },
        updateSchedule: (id, params = {}) => {
            dispatch(updateSchedule(id, params))
        }
    })
)(ClassroomSchedule);

export default withTranslation('translations')(ClassroomSchedule);