import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../ui/table";

import "../../../styles/store.css"
import {Button} from "material-ui";
import red from "material-ui/es/colors/red";
import {NavLink} from "react-router-dom";

class ShoppingCartTable extends Component {

    state = {
        data:this.props.data,
        total:0
    }

    componentWillMount(){
        this.setState({total:this._getTotalSum(this.state.data)})
    }

    _removeItem(idx){
        this.state.data.splice(idx,1)
        this.setState({data:this.state.data})
    }

    _changeItemCount(idx,e) {
        let data = this.state.data;
        data.get(idx).get('item').set('count',e.target.value);
        this.setState({data});
        this.setState({total:this.state.total + Number(data.get(idx).get('item').get('price'))});
    }

    _getTotalSum(products) {
        let total = 0
        // for(var i=0;i<products.size;i++)
        // {
        //     if(isNaN(products[i].price)){
        //         continue;
        //     }
        //     total += (Number(products[i].price) * Number(products[i].count));
        // }

        products.map(function (item,i) {
            total += (Number(item.get('item').get('price')) * Number(item.get('item').get('count')));
        })

        return total;
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
                                <img src={item.get('item').get('thumbnail')} className="img-responsive" alt=""/>
                            </div>
                            <div className="productContent">
                                <h4>{item.get('item').get('title')}</h4>
                                <span>{item.get('item').get('description').substr(0,23) + '...'}</span>
                            </div>
                        </div>
                    </Td>
                    <Td width='172px'>
                        <input type="number" onChange={(e) => {_self._changeItemCount(i,e)}} value={item.get('item').get('count')} className="form-control productQuantity m-input m-input--solid"  style={{height:"50px"}}/>
                    </Td>
                    <Td width='132px'>
                        <span className="productPrice g-blue">
                            {parseInt(item.get('item').get('price')).toFixed(2) + "$"}
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

    _renderTotalRow() {
        return (
            <Row >
                <Td first={true} width='20px'></Td>
                <Td width='350px'>
                    <h3 className="text-right">{this.state.data.size + ' Items'}</h3>
                </Td>
                <Td width='180px'>
                    <span>Total</span><br/>
                    <span className="productPrice g-blue">
                            {parseInt(this.state.total).toFixed(2) + "$"}
                        </span>
                </Td>
                <Td width='175px'>
                      <NavLink to="/shopping/checkout" className="btn m-btm btn-info">Checkout</NavLink>
                </Td>

            </Row>
        )
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
                        {this._renderTotalRow()}
                    </Tbody>
                </Table>
            </div>
        );
    }
}

ShoppingCartTable.propTypes = {

};

ShoppingCartTable.defaultProps = {
    data:[]
}


export default ShoppingCartTable;
