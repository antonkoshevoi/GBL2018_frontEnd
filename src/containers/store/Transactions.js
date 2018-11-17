import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {getRecords} from "../../redux/transactions/actions";
import {selectGetRecordsRequest} from "../../redux/transactions/selectors";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/table";
import {IconButton, MenuItem, Select, FormHelperText} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import Card from "../../components/ui/Card";
import Pagination from '../../components/ui/Pagination';
import moment from 'moment/moment';

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.recordsRequest.get('pagination').get('page'),
            perPage: props.recordsRequest.get('pagination').get('perPage'),
            filter: 0
        }
    }
    
    componentDidMount(){
        this._getTransactions();
    }

    _getTransactions(){
        const { page, perPage, filter } = this.state;
        
        this.props.getRecords({page, perPage, filter: {status: filter}});
    }
    
    _selectPerPage (perPage) {
        const total = this.props.recordsRequest.get('pagination').get('total');
        const totalPages = Math.ceil(total / perPage);
        const page = Math.min(this.state.page, totalPages);

        this.setState({ perPage, page }, this._getTransactions);
    }
  
    _goToPage (page) {
        this.setState({ page }, this._getTransactions)
    }    

    _toggleSubTable(row) {
        this.setState({[row]:!this.state[row]})
    }
    
    _handleFilter(e) {
        const { value } = e.target;  
        
        this.setState({filter: value}, this._getTransactions);
    }    

    _renderTransactions() {
        const {recordsRequest, t} = this.props;
        const loading = recordsRequest.get('loading');
        const records = recordsRequest.get('records');

        if (!loading && records.size === 0) {
            return (
                <MessageRow>{t('noTransactions')}</MessageRow>
            );
        }

        return records.map((item, i) => {
            let badgeClass = item.get('status') !== 'due' ? item.get('status') === 'paid' ? 'm-badge--info' : 'm-badge--danger' : '';
            return ([
                <Row index={i} key={i}>
                    <Td  width='20px'>
                        <IconButton color="primary" onClick={()=> {this._toggleSubTable(`sub_${i}`)}}>
                            <i className={`fa fa-arrow-${( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) ? 'down' : 'right'}`}></i>
                        </IconButton>
                    </Td>
                    <Td width='102px'><a className="g-blue" target="_blank" href={item.get('invoiceUrl')}>{item.get('invoiceNo')}</a></Td>
                    <Td width='102px'>{item.get('total')}$</Td>
                    <Td width='100px'>{t(item.get('paymentType'))}</Td>
                    <Td width='140px'>
                        <span className={`m-badge m-badge--wide ${badgeClass}`}>{t(item.get('status'))}</span>
                    </Td>
                    <Td width='140px'>{moment(item.get('createdAt')).format('lll')}</Td>
                </Row>,
                ( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) && this._renderTransactionItemsBlock(item.get('items'))
            ])
        })
    }

    _renderTransactionItemsBlock(data) {
        const {t} = this.props;
        return (
            <tr key="block" className="animated fadeInDown sub-table">
                <td colSpan="9" className="no-padding">
                    <Table className="table-bordered m--margin-bottom-0">
                        <Thead >
                            <HeadRow>
                                <Th width="80px">{t('thumbnail')}</Th>
                                <Th width="180px">{t('title')}</Th>
                                <Th width="100px">{t('quantity')}</Th>
                                <Th width="150px">{t('price')}</Th>                                
                            </HeadRow>
                        </Thead>
                        <Tbody >
                            {this._renderTransactionItems(data)}
                        </Tbody>
                    </Table>
                </td>
            </tr>
        )
    }

    _renderTransactionItems(data) {
        return data.map((item,i) => {
            return (
                <Row key={i} index={i}>
                    <Td width="80px">                    
                        <div >
                            {item.get('thumbnail') ? <img src={item.get('thumbnail')} width={70} alt={item.get('title')}/> : '-'}
                        </div>
                    </Td>
                    <Td  width="180px"><NavLink className="g-blue" to={`/store/details/${item.get('itemId')}`}>{item.get('title')}</NavLink></Td>
                    <Td width='100px'>{item.get('quantity')}</Td>
                    <Td width='150px'>{Number(item.get('totalPrice')).toFixed(2)} $</Td>                    
                </Row>
            )
        })
    }

    render() {
        const {recordsRequest, t} = this.props;
        const {perPage, page} = this.state;
        const loading = recordsRequest.get('loading');
        const totalPages = recordsRequest.get('pagination').get('totalPages');
         
        return (
            <div className="transactionsList">
                <Card title={t('transactions')} icon="la la-money">
                    <div className='m--margin-top-10 m--margin-bottom-30'>
                      <div className='row'>
                        <div className='col-sm-6 m--align-right'>
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
                        <div className="col-sm-6">
                            <div  className="pull-right full-width" style={{maxWidth: 300}}>
                                <Select className='full-width' value={this.state.filter} onChange={(e) => { this._handleFilter(e) }} name="filter">                        
                                    <MenuItem value={0}>{t('all')}</MenuItem>
                                    <MenuItem value="paid">{t('paid')}</MenuItem>
                                    <MenuItem value="due">{t('due')}</MenuItem>
                                    <MenuItem value="declined">{t('declined')}</MenuItem>
                                </Select>
                                <FormHelperText>{t('filterTransactions')}</FormHelperText>
                            </div>
                        </div>                        
                      </div>
                    </div>                
                    <Table >
                        <Thead>
                            <HeadRow>
                                <Th width='20px'></Th>
                                <Th width='102px'>{t('invoice')}</Th>
                                <Th name='total' width='102px'>{t('total')}</Th>
                                <Th name='type' width='100px'>{t('type')}</Th>
                                <Th name='status' width='140px'>{t('status')}</Th>                                
                                <Th name='created' width='140px'>{t('date')}</Th>
                            </HeadRow>
                        </Thead>
                        <Tbody>
                        {this._renderTransactions()}
                        {loading && <TablePreloader text="Loading..." color="primary"/>}
                        </Tbody>
                    </Table>
                    <div className="row">
                      <div className="col-sm-12 m--margin-top-40 text-right">
                        <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                      </div>
                    </div>                    
                </Card>
            </div>
        );
    }    
}


Transactions = connect(
    (state) => ({
        recordsRequest: selectGetRecordsRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getRecords(params)) }
    })
)(Transactions);

export default translate("translations")(Transactions);



