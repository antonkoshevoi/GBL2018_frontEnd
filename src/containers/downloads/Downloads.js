import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getDownloadsRecords} from "../../redux/transactions/actions";
import {selectGetDownloadsRequest} from "../../redux/transactions/selectors";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/table";
import Card from "../../components/ui/Card";
import {Price} from "../../components/ui/Price";
import {DateTime} from "../../components/ui/DateTime";

class Downloads extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentDidMount(){
        this.props.getRecords();
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
                            {item.get('thumbnail') ? <img src={item.get('thumbnail')} width={90} alt={item.get('title')}/> : '-'}
                            <div className="ml-2 text-center flex-grow-1">
                                <p><strong>{item.get('title')}</strong></p>
                                <p className="text-muted">{item.get('description')}</p>                        
                            </div>
                        </div>
                    </Td>
                    <Td className="d-none d-md-table-cell"><span className="g-blue"><Price price={item.get('totalPrice')} currency={item.get('currency')} /></span></Td>
                    <Td className="d-none d-md-table-cell"><DateTime time={item.get('createdAt')} /></Td>
                    <Td>
                        <a title={t('downloadPdf')} rel="noopener noreferrer" className="btn btn-success m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill" href={item.get('downloadUrl')}>
                            <i className="fa fa-download text-white"></i>
                        </a>                    
                    </Td>
                </Row>              
            ])
        })
    }

    render() {
        const {recordsRequest, t} = this.props;       
        const loading = recordsRequest.get('loading');        
        
        return (<div className="transactionsList">
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
                </Card>
            </div>
        );
    }    
}


Downloads = connect(
    (state) => ({
        recordsRequest: selectGetDownloadsRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getDownloadsRecords(params)) }
    })
)(Downloads);

export default withTranslation("translations")(Downloads);



