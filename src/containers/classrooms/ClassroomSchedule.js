import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Select, MenuItem, FormHelperText, Radio, FormControlLabel } from '@material-ui/core';
import MuiDatePicker from '../../components/ui/MuiDatePicker';
import { HeadRow, Row, Table, Tbody, Td, Th, Thead } from '../../components/ui/table';
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
        
        const _self = this;
        const {t} = this.props;
        
        return units.map(function (unit, unitIndex) {
            
            let unitRowSpan = unit.lessons.length;
            
            return (
                <tr className="m-datatable__row m-datatable__row--even__none" key={unit.unitId + '-unitRow'}>                
                    <td className="m-datatable__cell rotate" width='50px' rowSpan={unitRowSpan} key={unit.unitId + '-unitName'}>
                        <div><span><b>{t('unit')} {unitIndex + 1}</b> {unit.unitName}</span></div>
                    </td>
                    {_self._renderLessons(unitIndex, unit.lessons)}
                </tr>
            );
        });
    }
    
    _renderLessons(unitIndex, lessons) {        
        
        const {id} = this.props.match.params;
        const {t} = this.props;
    
        return lessons.map(function (lesson, lessonIndex) {
            return (
                <Row key={lesson.lessonId + '-lessonRow'}>
                    <Td width='350px'>
                        <p className="text-center"><span className="m-badge m-badge--brand m-badge--wide">{t('unit')} {unitIndex + 1}, {t('lesson')} {lessonIndex + 1}</span> </p>                        
                        <p className="text-center"><span>{lesson.lessonName}</span></p>
                    </Td>
                    <Td width='450px'><p className="text-center">{lesson.lessonDescription}</p></Td>
                    <Td width='300px'>
                        <AttemptDateForm lesson={lesson} classroomId={id} />
                    </Td>
                    <Td>-</Td>                    
                </Row>
            );
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
                    <div className='m-portlet__head'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-user' style={{fontSize: '55px'}}></i></span>
                                <h3 className='m-portlet__head-text'>
                                {loaded ? t('classRoomSchedule', {classroom: schedule.crmName}) : '...'}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className='m-portlet__body'>
                        <div className='m-form m-form--label-align-left m--margin-top-20 m--margin-bottom-30'>
                            <div className="row">                                       
                                <label className="col-lg-1 col-md-3 col-sm-4 m--margin-top-20">{t('scheduleBy')}:</label>
                                <div className="col-lg-4 col-md-5 col-sm-6">
                                    <div>
                                        <FormControlLabel 
                                            label={t('unit')}
                                            control={<Radio name="scheduleType" checked={this.state.scheduleType === 'unit'} onChange={(e) => {this._handleInputChange(e)}} value="unit" />}          
                                        />                           
                                        <FormControlLabel 
                                            label={t('lesson')}
                                            control={<Radio name="scheduleType" checked={this.state.scheduleType === 'lesson'} onChange={(e) => {this._handleInputChange(e)}} value="lesson" />}          
                                        />
                                    </div>
                                    {errors && errors.get('scheduleType') &&  <FormHelperText error>{errors.get('scheduleType').get(0)}</FormHelperText>}                                    
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-lg-1 col-md-3 col-sm-4">{t('frequency')}:</label>
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
                            <div className="row">
                                <label className="col-lg-1 col-md-3 col-sm-4" htmlFor="startDate">{t('startDate')}:</label>
                                <div className="col-lg-4 col-md-5 col-sm-6">
                                    <div>
                                        <MuiDatePicker
                                            name='startDate'
                                            value={this.state.startDate || null}
                                            onChange={(e) => { this._handleDateChange(e, 'startDate') }}
                                        />
                                        <Button disabled={disabled} variant="raised" color='primary' onClick={() => { this._saveSchedule() }} className='mt-btn mt-btn-success m--margin-left-15'>Execute</Button>
                                    </div>
                                    {errors && errors.get('startDate') && <FormHelperText error>{errors.get('startDate').get(0)}</FormHelperText>}                                    
                                </div>                       
                            </div>                              
                        </div>   
                    </div>
                    <div className='m-portlet__body'>
                        {loaded ?
                            <Table className="unit-table">
                            <Thead>
                                <HeadRow>
                                    <Th width='50px'>{t('unit')}</Th>
                                    <Th width='350px'>{t('lessonTitle')}</Th>
                                    <Th width='450px'>{t('lessonDescription')}</Th>
                                    <Th width='300px'>{t('lessonAttempt')}</Th>    
                                    <Th>{t('instructions')}</Th>
                                </HeadRow>
                            </Thead>
                            <Tbody>                           
                                {this._renderUnits(schedule.units)}
                            </Tbody>
                        </Table> : <Loader/>}
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

export default translate('translations')(ClassroomSchedule);