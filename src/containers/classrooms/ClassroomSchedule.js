import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, Select, MenuItem, Input, CircularProgress, FormControl, FormHelperText, InputLabel, Radio, FormControlLabel } from 'material-ui';
import DatePicker from '../../components/ui/DatePicker';
import { HeadRow, Row, Table, Tbody, Td, Th, Thead, TablePreloader } from '../../components/ui/table';
import { connect } from 'react-redux';
import { selectGetScheduleRequest, selectUpdateScheduleRequest } from '../../redux/classrooms/selectors';
import { getSchedule , updateSchedule} from '../../redux/classrooms/actions';
import HasPermission from "../middlewares/HasPermission";
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

    _handleCheckboxChange(event) {
        const {value} = event.target;
        const index = this.state.studentIds.indexOf(value.toString());

        if (index < 0) {
            this.state.studentIds.push(value.toString());
        } else {
            this.state.studentIds.splice(index, 1);
        }

        this.props.onChange(this.state.studentIds);
    }    
    
    _handleInputChange(event) {
        const { name, type, value, checked } = event.target;
        
        alert(value);
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
        alert('_saveSchedule')
    }
    
    _renderUnits(units) {
        
        const _self = this;
        
        return units.map(function (unit, unitIndex) {
            
            let unitRowSpan = unit.lessons.length;
            
            return (
                <tr className="m-datatable__row m-datatable__row--even__none" key={unit.unitId + '-unitRow'}>                
                    <td className="m-datatable__cell rotate" width='50px' rowSpan={unitRowSpan} key={unit.unitId + '-unitName'}>
                        <div><span><b>Unit {unitIndex + 1}</b> {unit.unitName}</span></div>
                    </td>
                    {_self._renderLessons(unitIndex, unit.lessons)}
                </tr>
            );
        });
    }
    
    _renderLessons(unitIndex, lessons) {        
        
        const {id} = this.props.match.params;
    
        return lessons.map(function (lesson, lessonIndex) {
            return (
                <Row key={lesson.lessonId + '-lessonRow'}>
                    <Td width='350px'>
                        <p className="text-center"><span class="m-badge m-badge--brand m-badge--wide">Unit {unitIndex + 1}, Lesson {lessonIndex + 1}</span> </p>                        
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
        const {getScheduleRequest} = this.props;
        
        const loaded    = getScheduleRequest.get('success');
        const schedule  = loaded ? getScheduleRequest.get('results').toJS() : {};
                                                                                                       
            return (
                <div className='fadeInLeft  animated learning-areas'>
                    <div className='m-portlet m-portlet--head-solid-bg'>
                        <div className='m-portlet__head'>
                            <div className='m-portlet__head-caption'>
                                <div className='m-portlet__head-title'>
                                    <span className='m-portlet__head-icon'><i className='la la-user' style={{fontSize: '55px'}}></i></span>
                                    <h3 className='m-portlet__head-text'>
                                    {loaded ? (schedule.crmName + '- ClassRoom Schedule') : '...' }
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className='m-portlet__body'>
                            <div className='m-form m-form--label-align-left m--margin-top-20 m--margin-bottom-30'>
                                <div className="row">                                       
                                    <label className="col-lg-1 col-md-3 col-sm-4" style={{marginTop: '15px'}}>Schedule By:</label>
                                    <div className="col-lg-4 col-md-5 col-sm-6">
                                        <div class="pull-left">
                                            <FormControlLabel 
                                                label="Unit"
                                                control={<Radio name="scheduleType" checked={this.state.scheduleType == 'unit'} onChange={(e) => {this._handleInputChange(e)}} value="unit" />}          
                                            />               
                                        </div>
                                        <div class="pull-left">
                                            <FormControlLabel 
                                                label="Lesson"
                                                control={<Radio name="scheduleType" checked={this.state.scheduleType == 'lesson'} onChange={(e) => {this._handleInputChange(e)}} value="lesson" />}          
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-lg-1 col-md-3 col-sm-4">Frequency:</label>
                                    <div className="col-lg-4 col-md-5 col-sm-6">
                                        <Select
                                        name="days"                                                
                                        value={this.state.days || 0}
                                        onChange={(e) => { this._handleInputChange(e) }} >
                                        <MenuItem value="0">0</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                        <MenuItem value="6">6</MenuItem>
                                        <MenuItem value="7">7</MenuItem>
                                      </Select>
                                      <label className="col-lg-2 col-md-3 col-sm-4" htmlFor="days">Days</label>                     
                                        <Select
                                        name="weeks"                                                
                                        value={this.state.weeks || 0}
                                        onChange={(e) => { this._handleInputChange(e) }} >
                                        <MenuItem value="0">0</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                      </Select>
                                      <label className="col-lg-3" htmlFor="weeks">Weeks</label>
                                    </div>                                            
                                </div>
                                <div className="row">
                                    <label className="col-lg-1 col-md-3 col-sm-4" htmlFor="startDate">Start Date:</label>
                                    <div className="col-lg-4 col-md-5 col-sm-6">
                                        <DatePicker
                                        name='startDate'
                                        value={this.state.startDate || null}
                                        onChange={(e) => { this._handleDateChange(e, 'startDate') }}
                                      />
                                        <Button variant="raised" color='primary' onClick={() => { this._saveSchedule() }} className='mt-btn mt-btn-success text-center'>Execute</Button>
                                    </div>                       
                                </div>                              
                            </div>   
                        </div>
                        <div className='m-portlet__body'>
                            <Table className="unit-table">
                                <Thead>
                                    <HeadRow>
                                        <Th width='50px'>Unit</Th>
                                        <Th width='350px'>Lesson Title</Th>
                                        <Th width='450px'>Lesson Description</Th>
                                        <Th width='300px'>Lesson attempt</Th>    
                                        <Th>Instructions</Th>
                                    </HeadRow>
                                </Thead>
                                <Tbody>
                                {loaded ? this._renderUnits(schedule.units) : <TablePreloader text="..." color="primary"/>}
                                </Tbody>
                            </Table>            
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

export default ClassroomSchedule;