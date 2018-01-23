import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../ui/table";

import "../../../styles/store.css"
import {Button} from "material-ui";
import red from "material-ui/es/colors/red";

class ShoppingCartTable extends Component {

    state = {
        data:this.props.data
    }

    _removeItem(idx){
        this.state.data.splice(idx,1)
        this.setState({data:this.state.data})
    }

    _changeItemCount(idx,e) {
        //
    }

    _renderRows(rows) {

        const _self = this;

        return rows.map(function (item, i) {

            return (
                <Row index={i} key={i}>
                    <Td first={true} width='20px'>{i + 1}</Td>
                    <Td width='400px'>
                        <div className="productInfo">
                            <div className="productImg" >
                                <img src={item.image} className="img-responsive" alt=""/>
                            </div>
                            <div className="productContent">
                                <h4>{item.title}</h4>
                                <span>{item.desc.substr(0,23) + '...'}</span>
                            </div>
                        </div>
                    </Td>
                    <Td width='172px'>
                        <input type="number" onChange={(e) => {_self._changeItemCount(i,e)}} value={item.count} className="form-control productQuantity m-input m-input--solid"  style={{height:"50px"}}/>
                    </Td>
                    <Td width='132px'>
                        <span className="productPrice g-blue">
                            {parseInt(item.price).toFixed(2) + "$"}
                        </span>
                    </Td>
                    <Td width="50px">
                        <button onClick={() => {_self._removeItem(i)}} className="btn btn-danger m-btn m-btn--icon btn-lg m-btn--icon-only m-btn--pill" >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Td>
                </Row>
            )
        })
    }

    render() {
        const {data} = this.state;
        return (
            <div className="shoppingCartTable">
                <Table>
                    <Thead>
                    <HeadRow>
                        <Th first={true} width='20px'>#</Th>
                        <Th name='product'  width='400px'>Product</Th>
                        <Th name='quantity' width='172px'>Quantity</Th>
                        <Th name='price' width='100px'>Price</Th>
                        <Th name='actions' width='50px'>Delete</Th>
                    </HeadRow>
                    </Thead>
                    <Tbody>
                        {this._renderRows(data)}
                    </Tbody>
                </Table>
            </div>
        );
    }
}

ShoppingCartTable.propTypes = {
    data:PropTypes.array.isRequired
};

ShoppingCartTable.defaultProps = {
    data:[]
}


export default ShoppingCartTable;