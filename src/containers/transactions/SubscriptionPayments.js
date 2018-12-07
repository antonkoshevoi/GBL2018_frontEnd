import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/table';
import { selectPagination, selectGetPaymentsRequest } from '../../redux/subscriptions/selectors';
import { getPayments } from '../../redux/subscriptions/actions';
import Pagination from '../../components/ui/Pagination';
import moment from 'moment/moment';

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
            <Row index={key} key={key}>
                <Td>{this._recordNumber(key)}</Td>
                <Td><a className="g-blue" href={record.get('invoiceUrl')}>{record.get('number')}</a></Td>
                <Td><span className='m-badge m-badge--brand m-badge--wide'>{t(record.get('type'))}</span></Td>                
                <Td>{record.get('transactionCode')}</Td>
                <Td>{record.get('subscription')} {t('subscription')}</Td>        
                <Td>{t(record.get('period'))}</Td>
                <Td>${record.get('total')}</Td>
                <Td>{moment(record.get('createdAt')).format('lll')}</Td>
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
                        <HeadRow>
                            <Th>#</Th>
                            <Th>{t('invoice')}</Th>
                            <Th>{t('type')}</Th>
                            <Th>{t('transactionCode')}</Th>
                            <Th>{t('subscription')}</Th>
                            <Th>{t('period')}</Th>
                            <Th>{t('total')}</Th>
                            <Th>{t('date')}</Th>                  
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