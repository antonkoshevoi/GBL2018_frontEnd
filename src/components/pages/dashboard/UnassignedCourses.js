import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../ui/Card";
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../ui/table";
import {connect} from "react-redux";
import {getUnassignedsRequest} from "../../../redux/store/selectors";
import {getUnassigneds} from "../../../redux/store/actions";

class UnassignedCourses extends Component {

  _renderUnassigneds() {
    const unassigneds = this.props.getUnassignedsRequest.get('records');

    if (!unassigneds.size) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>Not Unassigned credits</h2>
            </div>
          </td>
        </tr>
      )
    }

    return unassigneds.map(function (unassigned, i) {
      return (
        <Row index={i} key={i}>
          <Td first={true} width='100px'>{i + 1}</Td>
          <Td width="80px">
            <div >
              <img src={unassigned.get('item').get('thumbnail')} width={70}/>
            </div>
          </Td>
          <Td width='132px'>{unassigned.get('item').get('title')}</Td>
          <Td width='132px'>{unassigned.get('item').getIn(['resource', 'type'])}</Td>
          <Td width='132px'>{unassigned.get('quantity')}</Td>
        </Row>
      )
    })
  }

  render() {
    return (
      <Card title="Unassigned Courses" icon="fa fa-list-alt">
        <Table>
          <Thead>
          <HeadRow>
            <Th first={true} width='100px'>Order #</Th>
            <Th name='username' width='190px'>Course Name</Th>
            <Th name='firstName' width='100px'>Status</Th>
          </HeadRow>
          </Thead>
          <Tbody>
            {this._renderUnassigneds()}
          </Tbody>
        </Table>
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
