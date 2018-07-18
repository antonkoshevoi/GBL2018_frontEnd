import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from '../../components/ui/table';
import { selectGetRecordsRequest, selectRecords } from '../../redux/subscriptions/selectors';
import { getRecords } from '../../redux/subscriptions/actions';

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        subscriptions: []  
    }
  }

  componentDidMount () {
    const { getRecords } = this.props;
    getRecords();
  }
  
  _renderRecords () {
    const { subscriptions, t } = this.props;
    const loading = this.props.getRecordsRequest.get('loading');

      if (!loading && subscriptions.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>{t('usersNotFound')}</h2>
            </div>
          </td>
        </tr>
      )
    }

    return subscriptions.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='100px'>{key + 1}</Td>
        <Td width='132px'>{record.get('title')}</Td>
        <Td width='132px'>{record.get('description')}</Td>
        <Td width='132px'>{record.get('bonuses')}</Td>
        <Td width='132px'>{record.get('priceMonthly')}</Td>
        <Td width='132px'>{record.get('priceYearly')}</Td>
        <Td width='132px'>{record.get('allowedCourses')}</Td>        
      </Row>
    ));
  }

  render() {
    const { getRecordsRequest, t } = this.props;
    const loading = getRecordsRequest.get('loading');    

    return (
      <div className='fadeInLeft  animated'>

        <div className='m-portlet m-portlet--head-solid-bg'>
          <div className='m-portlet__head border-b-orange'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
              <span className='m-portlet__head-icon'><i className='la la-user' style={{fontSize:'55px'}}></i></span>
                <h3 className='m-portlet__head-text'>{t('subscriptions')}</h3>
              </div>
            </div>
            <div className="m-portlet__head-tools">
            </div>
          </div>
          <div className='m-portlet__body'>

            <Table>
              <Thead>
                <HeadRow>
                  <Th first={true} width='100px'>#</Th>                  
                  <Th width='132px'>{t('title')}</Th>
                  <Th width='132px'>{t('description')}</Th>
                  <Th width='132px'>{t('bonuses')}</Th>
                  <Th width='132px'>{t('priceMonthly')}</Th>
                  <Th width='132px'>{t('priceYearly')}</Th>
                  <Th width='132px'>{t('allowedCourses')}</Th>
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
        </div>
      </div>
    );
  }
}

Subscriptions = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),    
    subscriptions: selectRecords(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) }    
  })
)(Subscriptions);

export default translate('translations')(Subscriptions);