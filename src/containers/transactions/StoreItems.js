import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getRecords} from "../../redux/transactions/actions";
import {selectGetRecordsRequest} from "../../redux/transactions/selectors";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/table";
import {IconButton, MenuItem, Select, FormHelperText} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import {Price} from "../../components/ui/Price";
import {DateTime} from "../../components/ui/DateTime";
import Pagination from '../../components/ui/Pagination';

class StoreItems extends Component {

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

    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
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
                    <Td className="d-none d-md-table-cell">{this._recordNumber(i)}</Td> 
                    <Td>
                        <div className="d-md-none text-left">
                            <div className="row mb-1">
                                <div className="col-5"><span className="text-muted">{t('invoice')}:</span></div>
                                <div className="col-7"><strong><a rel="noopener noreferrer" className="g-blue" target="_blank" href={item.get('invoiceUrl')}>{item.get('invoiceNo')}</a></strong></div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-5"><span className="text-muted">{t('type')}:</span></div>
                                <div className="col-7">{t(item.get('paymentType'))}</div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-5"><span className="text-muted">{t('total')}:</span></div>
                                <div className="col-7"><strong>${item.get('total')} {item.get('currency')}</strong></div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-5"><span className="text-muted">{t('date')}:</span></div>
                                <div className="col-7"><DateTime time={item.get('createdAt')} /></div>
                            </div>                            
                            <div className="row mb-1">
                                <div className="col-5"><span className="text-muted">{t('items')}:</span></div>
                                <div className="col-7">
                                    <span className="m--margin-right-10">{item.get('items').size}</span>
                                    (<button className="g-blue btn-link" href="" color="primary" onClick={()=> {this._toggleSubTable(`sub_${i}`)}}>
                                        {t('showDetails')}
                                    </button>)
                                </div>
                            </div>
                        </div>
                        <div className="d-none d-md-block">
                            <a rel="noopener noreferrer" className="g-blue" target="_blank" href={item.get('invoiceUrl')}>{item.get('invoiceNo')}</a>
                        </div>
                    </Td>
                    <Td className="d-none d-md-table-cell">
                        {item.get('items').size}
                        <IconButton title={t('showDetails')} className="m--margin-left-15" color="primary" onClick={()=> {this._toggleSubTable(`sub_${i}`)}}>
                            <i className={`fa fa-arrow-${( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) ? 'down' : 'right'}`}></i>
                        </IconButton>                        
                    </Td>                    
                    <Td className="d-none d-md-table-cell">{t(item.get('paymentType'))}</Td>
                    <Td className="d-none d-md-table-cell"><span className={`m-badge m-badge--wide ${badgeClass}`}>{t(item.get('status'))}</span></Td>
                    <Td className="d-none d-md-table-cell"><Price price={item.get('total')} currency={item.get('currency')} /></Td>
                    <Td className="d-none d-md-table-cell"><DateTime time={item.get('createdAt')} /></Td>
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
                                <Th>{t('thumbnail')}</Th>
                                <Th>{t('title')}</Th>
                                <Th>{t('quantity')}</Th>
                                <Th>{t('price')}</Th>                                
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
                    <Td>                    
                        <div >
                            {item.get('thumbnail') ? <img src={item.get('thumbnail')} width={70} alt={item.get('title')}/> : '-'}
                        </div>
                    </Td>
                    <Td>
                        <NavLink className="g-blue" to={`/store/details/${item.get('itemId')}`}>{item.get('title')}</NavLink>
                        {(item.get('downloadUrl') && item.get('isDigitalOnly')) && <a className="btn btn-success m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m--margin-left-15" href={item.get('downloadUrl')}><i class="fa fa-download" aria-hidden="true"></i></a>}
                    </Td>
                    <Td>{item.get('quantity')}</Td>
                    <Td><Price price={item.get('totalPrice')} currency={item.get('currency')} /></Td>                    
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
            <div>
                <div className='row'>
                    <div className='col-6 col-sm-6 m--align-right'>
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
                    <div className="col-6 col-sm-6">
                        <div className="pull-right table-filter">
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
                <Table>
                    <Thead>
                        <HeadRow className="d-none d-md-table-row">
                            <Th>#</Th>
                            <Th>{t('invoice')}</Th>
                            <Th>{t('items')}</Th>
                            <Th>{t('type')}</Th>
                            <Th>{t('status')}</Th>                                
                            <Th>{t('total')}</Th>
                            <Th>{t('date')}</Th>                                    
                        </HeadRow>
                    </Thead>
                    <Tbody>
                        {this._renderTransactions()}
                        {loading && <TablePreloader text={t('loading')} />}
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


StoreItems = connect(
    (state) => ({
        recordsRequest: selectGetRecordsRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getRecords(params)) }
    })
)(StoreItems);

export default withTranslation("translations")(StoreItems);



