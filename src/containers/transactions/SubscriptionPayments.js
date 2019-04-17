import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/table';
import { DateTime } from "../../components/ui/DateTime";
import { Price } from '../../components/ui/Price';
import { selectPagination, selectGetPaymentsRequest } from '../../redux/subscriptions/selectors';
import { getPayments } from '../../redux/subscriptions/actions';
import Pagination from '../../components/ui/Pagination';

class SubscriptionPayments extends Component {
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
              <MessageRow>{t('paymentsNotFound')}</MessageRow>
            );
        }
        return paymentsRequest.get('records').map((record, key) => (
            <Row className="Row" key={key}>
                <Td>                                
                    <div className="d-md-none text-left">
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('invoice')}:</span></div>
                            <div className="col-7"><strong><a className="g-blue" href={record.get('invoiceUrl')}>{record.get('number')}</a></strong></div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('type')}:</span></div>
                            <div className="col-7"><span className='m-badge m-badge--brand m-badge--wide'>{t(record.get('type'))}</span></div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('transactionCode')}:</span></div>
                            <div className="col-7">{record.get('transactionCode')}</div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('subscription')}:</span></div>
                            <div className="col-7">{t(record.get('subscription'))} {t('subscription')}</div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('period')}:</span></div>
                            <div className="col-7">{t(record.get('period'))}</div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('total')}:</span></div>
                            <div className="col-7"><strong><Price price={record.get('total')} currency={record.get('currency')} /></strong></div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('autoRenewal')}:</span></div>
                            <div className="col-7">{t(record.get('autoRenewal') ? 'yes' : 'no')}</div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5"><span className="text-muted">{t('date')}:</span></div>
                            <div className="col-7"><DateTime time={record.get('createdAt')} /></div>
                        </div>                        
                    </div>
                    <div className="d-none d-md-block">{this._recordNumber(key)} d-md-block</div>
                </Td>
                <Td className="d-none d-md-table-cell"><a className="g-blue" href={record.get('invoiceUrl')}>{record.get('number')}</a></Td>
                <Td className="d-none d-md-table-cell"><span className='m-badge m-badge--brand m-badge--wide'>{t(record.get('type'))}</span></Td>                
                <Td className="d-none d-md-table-cell">{record.get('transactionCode')}</Td>
                <Td className="d-none d-md-table-cell">{t(record.get('subscription'))} {t('subscription')}</Td>        
                <Td className="d-none d-md-table-cell">{t(record.get('period'))}</Td>
                <Td className="d-none d-md-table-cell"><Price price={record.get('total')} currency={record.get('currency')} /></Td>
                <Td className="d-none d-md-table-cell">{t(record.get('autoRenewal') ? 'yes' : 'no')}</Td>
                <Td className="d-none d-md-table-cell"><DateTime time={record.get('createdAt')} /></Td>
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
            <div>
                <div className='m--margin-top-10 m--margin-bottom-30'>
                    <div className='row'>
                        <div className='col-sm-12 m--align-right'>
                            <Select
                                className="pull-left table-select m--margin-top-5"
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
                        <HeadRow className="d-none d-md-table-row">
                            <Th>#</Th>
                            <Th>{t('invoice')}</Th>
                            <Th>{t('type')}</Th>
                            <Th>{t('transactionCode')}</Th>
                            <Th>{t('subscription')}</Th>
                            <Th>{t('period')}</Th>
                            <Th>{t('total')}</Th>
                            <Th>{t('autoRenewal')}</Th>                            
                            <Th>{t('date')}</Th>                  
                        </HeadRow>
                    </Thead>
                    <Tbody>
                      {paymentsRequest.get('loading') && <TablePreloader text={t('loading')} />}
                      {paymentsRequest.get('success') && this._renderRecords()}
                    </Tbody>
                </Table>
                <div className="row">
                    <div className="col-sm-12 m--margin-top-40 text-right">
                      <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                    </div>
                </div>
            </div>
        );
    }
}

SubscriptionPayments = connect(
  (state) => ({
        paymentsRequest: selectGetPaymentsRequest(state),   
        pagination: selectPagination(state)
  }),
  (dispatch) => ({
        getPayments: (params = {}) => { dispatch(getPayments(params)) }
  })
)(SubscriptionPayments);


export default translate('translations')(SubscriptionPayments);