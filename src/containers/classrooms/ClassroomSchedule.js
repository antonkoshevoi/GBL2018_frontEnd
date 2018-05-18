import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, MenuItem, Select, Input, CircularProgress } from 'material-ui';
import { HeadRow, Row, Table, Tbody, Td, Th, Thead, EditButton } from '../../components/ui/table';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectGetScheduleRequest } from '../../redux/classrooms/selectors';
import { getSchedule } from '../../redux/classrooms/actions';
import HasPermission from "../middlewares/HasPermission";
import AttemptDateForm from "./forms/AttemptDateForm";

class ClassroomSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const { getSchedule } = this.props;
        
        getSchedule(id);
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
        
        if (!getScheduleRequest.get('success') || getScheduleRequest.get('loading')) {
            return (
                <h2 className='text-center'><CircularProgress color='accent'/></h2>
            );
        }
               
        if (getScheduleRequest.get('success')) {
                                         
            const schedule = getScheduleRequest.get('results').toJS();
            
            return (
                <div className='fadeInLeft  animated learning-areas'>
                    <div className='m-portlet m-portlet--head-solid-bg'>
                        <div className='m-portlet__head'>
                            <div className='m-portlet__head-caption'>
                                <div className='m-portlet__head-title'>
                                    <span className='m-portlet__head-icon'><i className='la la-user' style={{fontSize: '55px'}}></i></span>
                                    <h3 className='m-portlet__head-text'>
                                        {schedule.crmName} - ClassRoom Schedule 
                                    </h3>
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
                                        <Th>Comments</Th>
                                    </HeadRow>
                                </Thead>
                                <Tbody>
                                    {this._renderUnits(schedule.units)}
                                </Tbody>
                            </Table>            
                        </div>
                    </div>
                </div>
            );
        }
    }
}

ClassroomSchedule = connect(
    (state) => ({
        getScheduleRequest: selectGetScheduleRequest(state),
    }),
    (dispatch) => ({
        getSchedule: (id, params = {}) => {
            dispatch(getSchedule(id, params))
        }
    })
)(ClassroomSchedule);

export default ClassroomSchedule;