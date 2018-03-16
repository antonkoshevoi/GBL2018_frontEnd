import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import {translate} from 'react-i18next';
import {selectGetParentRecordsRequest} from "../../redux/store/selectors";
import {getParentRecords} from "../../redux/store/actions";
import {MenuItem, Select} from "material-ui";
import Card from "../../components/ui/Card";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from "../../components/ui/table";


class AutoCreate extends Component {

  componentDidMount() {
    this.props.getParentStore();
  }

  /**
   * @param perPage
   * @private
   */
  _selectPerPage = (perPage) => {
    // const total = this.props.pagination.get('total');
    // const totalPages = Math.ceil(total / perPage);
    // const page = Math.min(this.state.page, totalPages);
    //
    // this.setState({ perPage, page }, this._getRecords)
  };


  _renderSelectPerPage(){
    let perPage = 10;
    return (
      <Select
        className="pull-left table-select"
        value={perPage}
        onChange={ (e) => this._selectPerPage(e.target.value)}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    )
  }

  _renderRecords(){
    const records = this.props.getParentStoreRequest.get('records');
    const loading = this.props.getParentStoreRequest.get('loading');

    if (!loading && records.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>Classrooms Not Found...</h2>
            </div>
          </td>
        </tr>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='100px'>{key + 1}</Td>
        <Td width='132px'>{record.get('title')}</Td>
        <Td width='132px'>{record.getIn(['courses', 'publisher','name'])}</Td>
        <Td width='132px'>{record.getIn(['course', 'crsTitle'])}</Td>
        <Td width='132px'>{record.getIn(['teacher', 'firstName'])} {record.getIn(['teacher', 'lastName'])}</Td>
        <Td width='132px'>{record.get('studentsCount')}</Td>
        <Td width='150px'>

        </Td>
      </Row>

    ))

  }

  render() {
    const {getParentStoreRequest} = this.props;
    const storeItems = getParentStoreRequest.get('records');
    const loading = getParentStoreRequest.get('loading');
    console.log('storeItems',storeItems);
    return (
      <Card title="Auto Class">
        <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
          {this._renderSelectPerPage()}
        </div>
        <div className="col-12">
          <Table>
            <Thead>
            <HeadRow>
              <Th first={true} width='100px'>#</Th>
              <Th name='name' width='132px'>Course name </Th>
              <Th name='publisher' width='132px'>Publisher</Th>
              <Th name='frequency' width='132px'>Frequency</Th>
              <Th name='rollover' width='132px'>Roll over day time</Th>
              <Th name='max' width='132px'>Max students</Th>
              <Th name='action' width='150px'>Create now</Th>
            </HeadRow>
            </Thead>

            <Tbody>
            {loading &&
            <TablePreloader text="Loading..." color="primary"/>
            }
            { this._renderRecords() }
            </Tbody>
          </Table>
        </div>
      </Card>
    );
  }
}


AutoCreate = connect(
  (state) => ({
    getParentStoreRequest: selectGetParentRecordsRequest(state)
  }),
  (dispatch) => ({
    getParentStore: () => {
      dispatch(getParentRecords())
    }
  }),
)(AutoCreate);


export default withRouter(translate('AutoCreate')(AutoCreate));