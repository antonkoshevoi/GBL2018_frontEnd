import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getRecords} from "../../redux/transactions/actions";
import {selectGetRecordsRequest} from "../../redux/transactions/selectors";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/table";
import {MenuItem, Select, FormHelperText, AppBar, DialogContent, Toolbar, Typography} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import {Price} from "../../components/ui/Price";
import {DateTime} from "../../components/ui/DateTime";
import Pagination from '../../components/ui/Pagination';
import Modal from '../../components/ui/Modal';  

class StoreItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenItemsModal: false,
            transaction: null,        
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
    
    _handleFilter(e) {
        const { value } = e.target;  
        
        this.setState({filter: value}, this._getTransactions);
    } 

    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }
    
    _showItemsModal(item) {
        this.setState({
            transaction: item,
            isOpenItemsModal: true
        });
    }
    
    _closeItemsModal() {
        this.setState({
            transaction: null,
            isOpenItemsModal: false
        });        
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
            let badgeClass = item.get('status') !== 'due' ? item.get('status') === 'paid' ? 'badge-info' : 'badge-danger' : 'badge-secondary';
            return <Row index={i} key={i}>
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
                                <span className="mr-3">{item.get('items').size}</span>
                                (<button className="g-blue btn-link" href="" color="primary" onClick={()=> {this._showItemsModal(item)}}>
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
                    <button className="btn m-btn--icon-only btn-outline-info ml-3" title={t('showDetails')} onClick={()=> {this._showItemsModal(item)}}>
                        <i className={`la la-search`}></i>
                    </button>                        
                </Td>                    
                <Td className="d-none d-md-table-cell">{t(item.get('paymentType'))}</Td>
                <Td className="d-none d-md-table-cell"><span className={`badge ${badgeClass}`}>{t(item.get('status'))}</span></Td>
                <Td className="d-none d-md-table-cell"><Price price={item.get('total')} currency={item.get('currency')} /></Td>
                <Td className="d-none d-md-table-cell"><DateTime time={item.get('createdAt')} /></Td>
            </Row>;
        })
    }

    _renderTransactionItemsBlock(transaction) {
        const {t} = this.props;
        return (
            <Table className="table-bordered">
                <Thead >
                    <HeadRow>
                        <Th className="d-none d-md-table-cell">{t('thumbnail')}</Th>
                        <Th>{t('title')}</Th>
                        <Th className="d-none d-md-table-cell">{t('quantity')}</Th>
                        <Th>{t('price')}</Th>                                
                    </HeadRow>
                </Thead>
                <Tbody >
                    {transaction.get('items').map((item,i) => (<Row key={i} index={i}>
                            <Td width={110} className="d-none d-md-table-cell">                                                    
                                {item.get('thumbnail') ? <img src={item.get('thumbnail')} width={90} alt={item.get('title')}/> : '-'}                                
                            </Td>
                            <Td>
                                <NavLink className="g-blue" to={`/store/details/${item.get('itemId')}`}>{item.get('title')}</NavLink>
                                {(item.get('downloadUrl') && (item.get('isFree') || transaction.get('isAuthorized'))) && <a className="btn btn-success m-btn--icon-only ml-3" href={item.get('downloadUrl')}>
                                    <i className="fa fa-download" aria-hidden="true"></i>
                                </a>}
                                <p>{item.get('description')}</p>
                            </Td>
                            <Td className="d-none d-md-table-cell">{item.get('quantity')}</Td>
                            <Td><Price price={item.get('totalPrice')} currency={item.get('currency')} /></Td>                    
                        </Row>)
                    )}                    
                </Tbody>
            </Table> 
        )
    }
    
    _renderItemsModal() {
        const {isOpenItemsModal, transaction} = this.state;
        const {t} = this.props;
        
        return <Modal isOpen={isOpenItemsModal} onClose={() => this._closeItemsModal()} middle>
          <AppBar position='static' color='primary' className='dialogAppBar'>
            <Toolbar>                        
              <i className="la la-info-circle display-7 mr-2" aria-hidden="true"></i>               
              <Typography variant="h6" color='inherit'>
                {t('items')}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent className='mt-4'>                            
              {transaction && this._renderTransactionItemsBlock(transaction)}                            
          </DialogContent>
        </Modal>;        
    }



    render() {
        const {recordsRequest, t} = this.props;
        const {perPage, page} = this.state;
        const loading = recordsRequest.get('loading');
        const totalPages = recordsRequest.get('pagination').get('totalPages');
        
        return (
            <div>
                <div className='row'>
                    <div className='col-6 col-sm-6 text-right'>
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
                    <div className="col-sm-12 mt-5 text-right">
                        <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                    </div>
                </div>                
                {this._renderItemsModal()}
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



