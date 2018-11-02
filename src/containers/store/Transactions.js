import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {withRouter} from "react-router-dom";
import {getRecords} from "../../redux/transactions/actions";
import {selectGetRecordsRequest, selectRecords} from "../../redux/transactions/selectors";
import Card from "../../components/ui/Card";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/table";
import {IconButton} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import moment from 'moment/moment';

class Transactions extends Component {

    state = {

    }
    
    componentDidMount(){
        this._getTransactions();
    }

    _getTransactions(){
        this.props.getRecords();
    }    

    _toggleSubTable(row) {
        this.setState({[row]:!this.state[row]})
    }

    _renderTransactions() {
        const {records, cartRecordsRequest, t} = this.props;

        const loading = cartRecordsRequest.get('loading');

        if (!loading && records.size === 0) {
            return (
                <MessageRow>{t('noTransactions')}</MessageRow>
            )
        }

        return records.map((item, i) => {
            return ( [
                    <Row index={i} key={i}>
                        <Td first={true}  width='20px'>
                            <IconButton  color="primary" onClick={()=> {this._toggleSubTable(`sub_${i}`)}}>
                                <i className={`fa fa-arrow-${( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) ? 'down' : 'right'}`}></i>
                            </IconButton>
                        </Td>
                        <Td width='20px'>{i + 1}</Td>
                        <Td width='102px'><span style={{fontWeight:600}} className="g-blue">{item.get('total')}$</span></Td>
                        <Td width='100px'><span className='m-badge m-badge--brand m-badge--wide'>{t(item.get('paymentType'))}</span></Td>
                        <Td width='140px'>{moment(item.get('createdAt')).format('lll')}</Td>
                        <Td width='140px'>{item.get('authorizedAt') ? moment(item.get('authorizedAt')).format('lll') : (<i className="fa fa-close g-red"></i>)}</Td>
                    </Row>,
                    ( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) && this._renderTransactionItemsBlock(item.get('items'))
                ]
            )
        })
    }

    _renderTransactionItemsBlock(data) {
        const {t} = this.props;
        return (
            <tr key="block" className="animated fadeInDown m-datatable__row-subtable m-datatable__row sub-table m-datatable__row-subtable--even">
                <td className="m-datatable__subtable" colSpan="9">
                    <Table style={{minHeight:'300px'}}>
                        <Thead >
                            <HeadRow className="m-datatable__row">
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
                            <img src={item.get('item').get('thumbnail')} width={70} alt={item.get('title')}/>
                        </div>
                    </Td>
                    <Td  width="180px"><NavLink to={`/store/details/${item.get('item').get('id')}`}>{item.get('item').get('title')}</NavLink></Td>
                    <Td width='100px'><span style={{fontWeight:600}} className="g-blue">{item.get('quantity')}</span></Td>
                    <Td width='150px'><span style={{fontWeight:700,fontSize:'1.7rem'}} className="g-blue">{Number(item.get('item').get('price')).toFixed(2)} $</span></Td>
                </Row>
            )
        })
    }

    render() {
        const {cartRecordsRequest, t} = this.props;
        const loading = cartRecordsRequest.get('loading');
         
        return (
            <div className="transactionsList">
                <Card title={t('transactions')} icon="la la-money">
                    <Table >
                        <Thead>
                            <HeadRow>
                                <Th width='20px'></Th>
                                <Th first={true} width='20px'>#</Th>
                                <Th name='total' width='102px'>{t('total')}</Th>
                                <Th name='type' width='100px'>{t('type')}</Th>
                                <Th name='created' width='140px'>{t('created')}</Th>
                                <Th name='authorized' width='140px'>{t('authorized')}</Th>
                            </HeadRow>
                        </Thead>
                        <Tbody>
                        {this._renderTransactions()}
                        {loading && <TablePreloader text="Loading..." color="primary"/>}
                        </Tbody>
                    </Table>
                </Card>
            </div>
        );
    }    
}


Transactions = connect(
    (state) => ({
        cartRecordsRequest: selectGetRecordsRequest(state),
        records: selectRecords(state),
        auth: state.auth
    }),
    (dispatch) => ({
        getRecords: () => { dispatch(getRecords()) }
    })
)(Transactions);

export default withRouter(translate("translations")(Transactions));



