import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from '../../components/ui/table';
import { selectPagination, selectGetPaymentsRequest } from '../../redux/subscriptions/selectors';
import { getPayments } from '../../redux/subscriptions/actions';
import Pagination from '../../components/ui/Pagination';
import moment from 'moment/moment';

class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.pagination.get('page'),
            perPage: props.pagination.get('perPage')
        }
    }

    componentDidMount () {
        const { getPayments } = this.props;
        getPayments();
    }
  
    _goToPage (page) {
        this.setState({ page }, this._getRecords)
    }  

    _renderRecords () {
        const { paymentsRequest, t } = this.props;
    
        if (paymentsRequest.get('success') && paymentsRequest.get('records').size === 0) {
            return (
              <tr>
                <td>
                  <div className="table-message">
                    <h2>{t('paymentsNotFound')}</h2>
                  </div>
                </td>
              </tr>
            );
        }
        return paymentsRequest.get('records').map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='60px'>{this._recordNumber(key)}</Td>
                <Td width='100px'><strong className="g-blue">{record.get('total')}$</strong></Td>
                <Td width='100px'><span className='m-badge m-badge--brand m-badge--wide'>{t(record.get('type'))}</span></Td>                
                <Td width='150px'>{record.get('transactionCode')}</Td>
                <Td width='132px'>{record.get('subscription')} {t('subscription')}</Td>        
                <Td width='132px'>{moment(record.get('createdAt')).format('lll')}</Td>
            </Row>
        ));
    }

    _getRecords () {
        const { page, perPage } = this.state;

        this.props.getPayments({
            page, perPage
        });
    }

    _selectPerPage (perPage) {
        const total = this.props.pagination.get('total');
        const totalPages = Math.ceil(total / perPage);
        const page = Math.min(this.state.page, totalPages);

        this.setState({ perPage, page }, this._getRecords)
    }

    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }
  
    render() {
        const { paymentsRequest, pagination, t } = this.props;
        const { page, perPage } = this.state;        
        const totalPages = pagination.get('totalPages');

        return (
          <div className='fadeInLeft  animated learning-areas'>
            <div className='m-portlet m-portlet--head-solid-bg'>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                  <span className='m-portlet__head-icon'>
                    <i className='la la-money' style={{fontSize:'55px'}}></i>
                  </span>
                    <h3 className='m-portlet__head-text'>                  
                      {t('subscriptionPayments')}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='m-portlet__body'>
                <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                  <div className='row align-items-center'>
                    <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
                      <Select
                        className="pull-left table-select"
                        value={perPage}
                        onChange={(e) => { this._selectPerPage(e.target.value) }}>                        
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select> 
                    </div>
                  </div>
                </div>
                <Table>
                  <Thead>
                    <HeadRow>
                      <Th first={true} width='60px'>#</Th>
                      <Th width='100px'>{t('total')}</Th>
                      <Th width='100px'>{t('type')}</Th>
                      <Th width='150px'>{t('transactionCode')}</Th>
                      <Th width='132px'>{t('subscription')}</Th>
                      <Th width='132px'>{t('created')}</Th>                  
                    </HeadRow>
                  </Thead>
                  <Tbody>
                    {paymentsRequest.get('loading') && <TablePreloader text="Loading..." color="primary"/>}
                    {paymentsRequest.get('success') && this._renderRecords()}
                  </Tbody>
                </Table>
                <div className="row">
                  <div className="col-sm-12 m--margin-top-40 text-right">
                    <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Payments = connect(
  (state) => ({
        paymentsRequest: selectGetPaymentsRequest(state),   
        pagination: selectPagination(state)
  }),
  (dispatch) => ({
        getPayments: (params = {}) => { dispatch(getPayments(params)) }
  })
)(Payments);


export default translate('translations')(Payments);