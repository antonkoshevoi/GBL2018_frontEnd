import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getDownloadsRecords} from "../../redux/transactions/actions";
import {selectGetDownloadsRequest} from "../../redux/transactions/selectors";
import {getInvoice} from '../../redux/payments/actions';
import {invoiceRequest} from '../../redux/payments/selectors';
import {getRecords} from "../../redux/store/actions";
import {selectRecords} from "../../redux/store/selectors";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/Table";
import Card from "../../components/ui/Card";
import {Price} from "../../components/ui/Price";
import {DateTime} from "../../components/ui/DateTime";
import ConfirmButton from "../../components/ui/ConfirmButton";
import Sidebar from '../../components/store/Sidebar';
import SessionStorage from '../../services/SessionStorage';
import InvoiceModal from './modals/InvoiceModal';

class Downloads extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoice: null
        };
    }
    
    componentDidMount(){
        this.props.getDownloadsRecords();
        this.props.getStoreRecords({
            perPage: 10, 
            orderBy: 'rand',
            filter: {similarDownloads: true}
        });
                
        if (SessionStorage.get('lastInvoiceNo')) {
            this.props.getInvoice(SessionStorage.get('lastInvoiceNo'));
        }
    }
  
    componentDidUpdate(prevProps) {               
        if (this.props.invoiceRequest.get('success') && !prevProps.invoiceRequest.get('success')) {      
            this.setState({
                invoice: this.props.invoiceRequest.get('data')
            });
            SessionStorage.remove('lastInvoiceNo');
        }  
    } 
  
    _recordNumber(key) {        
        return (key + 1);
    }
    
    _renderTransactions() {
        const {recordsRequest, t} = this.props;
        const loading = recordsRequest.get('loading');
        const records = recordsRequest.get('records');

        if (!loading && records.size === 0) {
            return (
                <MessageRow>{t('noDownloads')}</MessageRow>
            );
        }

        return records.map((item, i) => {            
            return ([
                <Row index={i} key={i}>
                    <Td className="d-none d-md-table-cell">{this._recordNumber(i)}</Td> 
                    <Td>
                        <div className="d-flex align-items-center">
                            {item.get('thumbnail') && <div><img src={item.get('thumbnail')} style={{width: '90px'}} alt={item.get('title')}/></div>}
                            <div className="ml-2 text-center flex-grow-1">
                                <p><strong>{item.get('title')}</strong></p>
                                <p className="text-muted">{item.get('description')}</p>                        
                            </div>
                        </div>
                    </Td>
                    <Td className="d-none d-md-table-cell"><span className="g-blue"><Price price={item.get('totalPrice')} currency={item.get('currency')} /></span></Td>
                    <Td className="d-none d-md-table-cell"><DateTime time={item.get('createdAt')} /></Td>
                    <Td>
                        {item.get('isReady') ? 
                        <a title={t('downloadPdf')} rel="noopener noreferrer" className="btn btn-success m-btn--icon-only" href={item.get('downloadUrl')}>
                            <i className="fa fa-download text-white"></i>
                        </a> 
                        :
                        <ConfirmButton btnName={t('pendingPaymentMessage')} icon="fa fa-question text-white" className='btn-warning' confirmOnly={true} title={t('pendingPaymentMessage')} />}                                 
                    </Td>
                </Row>              
            ])
        })
    }

    render() {
        const {recordsRequest, t} = this.props;       
        const loading = recordsRequest.get('loading');        
        
        return (
                <div className="row m-0">
                    <div className="col-12 col-sm-7 col-md-8 col-lg-9 p-0">                
                        <Card title={t('myDownloads')} icon="fa fa-download" colorBorder="violet">
                            <Table>
                                <Thead>
                                    <HeadRow>
                                        <Th className="d-none d-md-table-cell">#</Th>                                
                                        <Th>{t('product')}</Th>                                
                                        <Th className="d-none d-md-table-cell">{t('price')}</Th>                                
                                        <Th className="d-none d-md-table-cell">{t('date')}</Th>
                                        <Th>{t('actions')}</Th>                                    
                                    </HeadRow>
                                </Thead>
                                <Tbody>
                                    {this._renderTransactions()}
                                    {loading && <TablePreloader text={t('loading')} />}
                                </Tbody>
                            </Table>
                            {this.state.invoice && <InvoiceModal isOpen={true} data={this.state.invoice} />}
                        </Card>
                    </div>
                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 p-0">
                        <Card title={t('similar')} icon="fa fa-download" colorBorder="green" style={{boxShadow: 'none'}}>
                            <Sidebar data={this.props.storeRecords} />
                        </Card>
                    </div>
                </div>
        );
    }    
}

export default withTranslation("translations")(connect(
    (state) => ({
        recordsRequest: selectGetDownloadsRequest(state),
        invoiceRequest: invoiceRequest(state),
        storeRecords: selectRecords(state)
    }),
    (dispatch) => ({
        getInvoice: (id) => dispatch(getInvoice(id, 'any')),
        getStoreRecords: (params = {}) => dispatch(getRecords(params)),
        getDownloadsRecords: (params = {}) => { dispatch(getDownloadsRecords(params)) }
    })
)(Downloads));



