import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../ui/Card";
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../ui/table";
import {connect} from "react-redux";
import {getUnassignedsRequest} from "../../../redux/store/selectors";
import {getUnassigneds} from "../../../redux/store/actions";
import AssignStudentModal from "./AssignStudentModal"

const AssignButton = ({ id, onClick}) => {
  return (
    <button
      className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'
      onClick={onClick && (() => { onClick(id) })}
      style={{marginLeft: '5px'}}
    >
      <i className='la la-user-plus'></i>
    </button>
  );
};

class UnassignedCourses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCourse: null,
      assignModalIsOpen: false
    }
  }
  
  componentDidMount() {
    const { getUnassigneds } = this.props;

    getUnassigneds();
  }
  
  _closeAssignDialog() {      
      this.setState({ assignModalIsOpen: false, selectedCourse: null });
  }
  
  _openAssignDialog(course) {
      this.setState({ selectedCourse: {
          id: course.get('id'),
          title: course.get('item').get('title'),
          image: course.get('item').get('thumbnail')
      }, assignModalIsOpen: true });
  }

  _handleAssigned() {      
      const { getUnassigneds } = this.props;
 
      getUnassigneds();
  }
  
  _renderUnassigneds() {
    const unassigneds = this.props.getUnassignedsRequest.get('records');

    if (!unassigneds.size) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>No Unassigned credits...</h2>
            </div>
          </td>
        </tr>
      )
    }

    return unassigneds.map((unassigned, i) => (      
        <Row index={i} key={i}>
          <Td width="70px">
            <div >
              <img src={unassigned.get('item').get('thumbnail')} width={70}/>
            </div>
          </Td>
          <Td width='150px'>{unassigned.get('item').get('title')}</Td>
          <Td width='50px'>{unassigned.get('quantity')}</Td>
          <Td width='50px'>
            <AssignButton onClick={() => { this._openAssignDialog(unassigned) }} id={unassigned.get('id')}/>
          </Td>
        </Row>      
     ));
  }

  render() {
      
    const {selectedCourse, assignModalIsOpen} = this.state;
    
    return (
      <Card title="Unassigned Courses" icon="fa fa-list-alt" isMainCard={true} isStore={true} style={{marginTop:15, height:'unset'}}>
        <Table>
          <Thead>
          <HeadRow>
            <Th name='image' width='70px'>Image</Th>
            <Th name='name' width='150px'>Course Name</Th>
            <Th name='count' width='50px'>Count</Th>
            <Th name='assign' width='50px'>Assign</Th>
          </HeadRow>
          </Thead>
          <Tbody>
            {this._renderUnassigneds()}
          </Tbody>
        </Table>
        <AssignStudentModal isOpen={ assignModalIsOpen } onClose={() => {this._closeAssignDialog()}} onSuccess={() => {this._handleAssigned()}}  course={ selectedCourse } />
      </Card>
    );
  }
}

UnassignedCourses = connect(
  (state) => ({
    getUnassignedsRequest: getUnassignedsRequest(state),
  }),
  (dispatch) => ({
    getUnassigneds: (params = {}) => { dispatch(getUnassigneds(params)) },
  })
)(UnassignedCourses);

export default UnassignedCourses;
