import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import Card from "../../../ui/Card";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from "../../../ui/table";
import {Icon, IconButton} from "material-ui";
import moment from "moment";

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
                            <h2>Students Not Found...</h2>
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
                        <Td width='240px'>{item.external_id}</Td>
                        <Td width='102px'>{item.total}</Td>
                        <Td width='100px'><span
                            className='m-badge m-badge--brand m-badge--wide'>{item.type}</span></Td>
                        <Td width='120px'>{moment(item.created).format("YY MMM hh:mm:ss")}</Td>
                        <Td width='132px'>{moment(item.authorized).format("YY MMM hh:mm:ss")}</Td>
                    </Row>,
                    ( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) && this._renderTransactionItemsBlock(item.items)
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
                                    <Th width="100px">ID</Th>
                                    <Th width="80px">Thumbnail</Th>
                                    <Th width="180px">Title</Th>
                                    <Th width="100px">Quantity</Th>
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
                    <Td width="100px">{item.id}</Td>
                    <Td width="80px">
                        <div >
                            <img src={item.thumbnail} width={70} alt={item.title}/>
                        </div>
                    </Td>
                    <Td  width="180px">{item.title}</Td>
                    <Td width='100px'><span style={{fontWeight:600}} className="g-blue">{item.quantity}</span></Td>

                </Row>
            )
        })
    }

    render() {
        const {request} = this.props;
        const loading = request.get('loading');

        return (
        <div>
            <Card title="Transactions" icon="la la-money">
                {loading &&
                <TablePreloader text="Loading..." color="accent"/>
                }
                <Table >
                    <Thead>
                        <HeadRow>
                            <Th  width='20px'></Th>
                            <Th first={true} width='20px'>#</Th>
                            <Th name='trans_id' width='240px'>ID</Th>
                            <Th name='firstName' width='102px'>Total</Th>
                            <Th name='lastName' width='100px'>Type</Th>
                            <Th name='email' width='120px'>Created</Th>
                            <Th width='132px'>Authorized</Th>
                        </HeadRow>
                    </Thead>
                    <Tbody>
                    {this._renderTransactions()}
                    </Tbody>
                </Table>
            </Card>
        </div>
        );
    }
    }

    TransactionList.propTypes = {};

    export default translate("transactionList")(TransactionList);
