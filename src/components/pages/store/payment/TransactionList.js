import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Card from "../../../ui/Card";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from "../../../ui/table";
import {Icon, IconButton} from '@material-ui/core';
import moment from "moment";
import {NavLink} from "react-router-dom";

class TransactionList extends Component {

    state = {

    }

    _toggleSubTable(row) {
        this.setState({[row]:!this.state[row]})
    }

    _renderTransactions() {
        const {data,request} = this.props;

        const loading = request.get('loading');


        if (!loading && data.size === 0) {
            return (
                <tr>
                    <td>
                        <div className="table-message">
                            <h2>No transactions...</h2>
                        </div>
                    </td>
                </tr>
            )
        }

        return data.map((item, i) => {
            return ( [
                    <Row index={i} key={i}>
                        <Td first={true}  width='20px'>
                            <IconButton  color="primary" onClick={()=> {this._toggleSubTable(`sub_${i}`)}}>
                                <i className={`fa fa-arrow-${( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) ? 'down' : 'right'}`}></i>
                            </IconButton>
                        </Td>
                        <Td width='20px'>{i + 1}</Td>
                        <Td width='102px'><span style={{fontWeight:600}} className="g-blue">{item.get('total')}$</span></Td>
                        <Td width='100px'><span
                            className='m-badge m-badge--brand m-badge--wide'>{item.get('paymentType')}</span></Td>
                        <Td width='140px'>{item.get('createdAt')}</Td>
                        <Td width='140px'>{item.get('authorizedAt') } {(!item.get('isAuthorized')) && <i className="fa fa-close g-red"></i>}</Td>
                    </Row>,
                    ( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) && this._renderTransactionItemsBlock(item.get('items'))
                ]
            )
        })
    }


    _renderTransactionItemsBlock(data) {
        return (
            <tr key="block" className="animated fadeInDown m-datatable__row-subtable m-datatable__row sub-table m-datatable__row-subtable--even">
                <td className="m-datatable__subtable" colSpan="9">

                        <Table style={{minHeight:'300px'}}>
                            <Thead >
                                <HeadRow className="m-datatable__row">
                                    <Th width="80px">Thumbnail</Th>
                                    <Th width="180px">Title</Th>
                                    <Th width="100px">Quantity</Th>
                                    <Th width="150px">Price</Th>
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
        const {request} = this.props;
        const loading = request.get('loading');

        return (
        <div className="transactionsList">
            <Card title="Transactions" icon="la la-money">

                <Table >
                    <Thead>
                        <HeadRow>
                            <Th width='20px'></Th>
                            <Th first={true} width='20px'>#</Th>
                            <Th name='total' width='102px'>Total</Th>
                            <Th name='type' width='100px'>Type</Th>
                            <Th name='created' width='140px'>Created</Th>
                            <Th name='authorized' width='140px'>Authorized</Th>
                        </HeadRow>
                    </Thead>
                    <Tbody>
                    {this._renderTransactions()}

                    {loading &&
                    <TablePreloader text="Loading..." color="primary"/>
                    }
                    </Tbody>
                </Table>
            </Card>
        </div>
        );
    }
    }

    TransactionList.propTypes = {};

    export default translate("transactionList")(TransactionList);
