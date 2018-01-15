import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon } from 'material-ui';
import AddStudentDialog from '../../components/pages/students/AddStudentDialog';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecords } from '../../redux/students/actions';
import { selectGetRecordsRequest, selectRecords } from '../../redux/students/selectors';
import { HeadRow, Row, Table, Tbody, Td, Th, Thead } from '../../components/ui/table';



class Students extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      sorted: {

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

  render() {
    const { getRecordsRequest } = this.props;
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
                  <Th first={true} width='100px'>#</Th>
                  <Th width='132px'>Username</Th>
                  <Th width='132px'>Firstname</Th>
                  <Th width='132px'>Lastname</Th>
                  <Th width='132px'>Email</Th>
                  <Th width='132px'>Role</Th>
                  <Th width='132px'>School</Th>
                  <Th width='100px'>Actions</Th>
                </HeadRow>
              </Thead>

              <Tbody>
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
    getRecords: () => { dispatch(getRecords()) }
  })
)(Students);


export default translate('students')(Students);