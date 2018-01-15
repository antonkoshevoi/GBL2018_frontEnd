import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {Button, CircularProgress, Icon} from 'material-ui';
import AddStudentDialog from '../../components/pages/students/AddStudentDialog';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecords } from '../../redux/students/actions';
import { selectGetRecordsRequest, selectRecords } from '../../redux/students/selectors';
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from '../../components/ui/table';
import { buildSortersQuery } from '../../helpers/utils';



class Students extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      sorters: {
      }
    }
  }

  componentDidMount () {
    const { getRecords } = this.props;

    getRecords();
  }


  _openAddDialog = () => {
    this.setState({ dialogIsOpen: true });
  };

  _closeAddDialog = () => {
    this.setState({ dialogIsOpen: false });
  };

  _renderRecords () {
    const { records } = this.props;

    if (records.length === 0) {
      return (
          <tr>
            <td>
              <div className="table-message">
                <h2>Student Not Found...</h2>
              </div>
            </td>
          </tr>
      )
    }

    return records.map((record, key) => (
      <Row key={key}>
        <Td first={true} width='100px'>{key + 1}</Td>
        <Td width='132px'>{record.get('username')}</Td>
        <Td width='132px'>{record.get('firstName')}</Td>
        <Td width='132px'>{record.get('lastName')}</Td>
        <Td width='132px'>{record.get('email')}</Td>
        <Td width='132px'><span className='m-badge m-badge--brand m-badge--wide'>Student</span></Td>
        <Td width='132px'>{record.get('school')}</Td>
        <Td width='100px'>
          <button  className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
            <i className='la la-edit'></i>
          </button>
        </Td>
      </Row>
    ));
  }

  _sort (name) {
    let sorters = {};

    if(this.state.sorters[name]) {
      sorters[name] = this.state.sorters[name] === 'asc' ? 'desc' : 'asc';
    } else {
      sorters[name] = 'asc';
    }

    this.setState({ sorters });
    this.props.getRecords({
      orderBy: buildSortersQuery(sorters)
    });
  }

  render() {
    const { getRecordsRequest } = this.props;
    const { sorters } = this.state;
    const loading = getRecordsRequest.get('loading');

    return (
      <div className='fadeInLeft  animated'>

        <div className='m-portlet m-portlet--head-solid-bg m-portlet--brand'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
              <span className='m-portlet__head-icon'>
							  <i className='la la-user' style={{fontSize:'55px'}}></i>
						  </span>
                <h3 className='m-portlet__head-text'>
                  Students
                </h3>
              </div>
            </div>

          </div>
          <div className='m-portlet__body'>
            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
              <div className='row align-items-center'>

                <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
                  <Button raised color='accent' onClick={this._openAddDialog} className='mt-btn mt-btn-success' style={{marginRight:'7px'}}>
                    Add New
                    <Icon style={{marginLeft:'5px'}}>add</Icon>
                  </Button>
                  <NavLink className='link-btn' to='/students/csv'>
                  <Button raised className='btn-success mt-btn mt-btn-success' >

                         Bulk Add Students
                    <Icon style={{marginLeft:'5px'}}>person</Icon>
                  </Button>
                  </NavLink>
                </div>

              </div>
            </div>

            <Table>
              <Thead>
                <HeadRow>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['id']} name='id' first={true} width='100px'>#</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['username']} name='username' width='132px'>Username</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['firstName']} name='firstName' width='132px'>Firstname</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['lastName']} name='lastName' width='132px'>Lastname</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['email']} name='email' width='132px'>Email</Th>
                  <Th width='132px'>Role</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='school' width='132px'>School</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['actions']} name='actions' width='100px'>Actions</Th>
                </HeadRow>
              </Thead>

              <Tbody>
                {loading &&
                         <TablePreloader text="Loading..." color="accent"/>
                }
                { this._renderRecords() }
              </Tbody>
            </Table>
          </div>
        </div>

        <AddStudentDialog dialogIsOpen={this.state.dialogIsOpen} handlerClose = {this._closeAddDialog} />
      </div>
    );
  }
}

Students = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    records: selectRecords(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) }
  })
)(Students);


export default translate('students')(Students);