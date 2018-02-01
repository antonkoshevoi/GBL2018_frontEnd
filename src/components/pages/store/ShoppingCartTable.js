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
        const {data} = this.props;
        this.setState({total:this._getTotalSum(data)});
    }


    _updateData(data){
        const total = this._getTotalSum(data);
        this.setState({data});
        this.setState({total});
        this.props.onUpdate(data,total)
    }

    _removeItem(idx){
        this.state.data.splice(idx,1);
        this.setState({data:this.state.data})
    }

    _changeItemCount(idx,e) {
        let data = this.state.data;
        if (e.target.value < 1) return;
        data[idx]['count'] = e.target.value;
        this._updateData(data)
    }



    _getTotalSum(products) {
        let total = 0
        for(var i=0;i<products.length;i++)
        {
            if(isNaN(products[i].storeItem.price)){
                continue;
            }
            total += (Number(products[i].storeItem.price) * Number(products[i].count));
        }
        return total;
    }


    _getEmptyMessage(){
        return (
           <div className="m--padding-20">
               <h2 className="text-center m--padding-10">Shopping Cart Is Empty</h2>
           </div>
        )
    }


    _renderRows(rows) {
        const _self = this;


        return rows.map(function (item, i) {

            return (
                <Row index={i} key={i}>
                    <Td first={true} width='10px'>{i + 1}</Td>
                    <Td width='260px'>
                        <div className="productInfo">
                            <div className="productImg" >
                                <img src={item.storeItem.thumbnail} className="img-responsive" alt=""/>
                            </div>
                            <div className="productContent">
                                <NavLink to={`/store/details/${item.storeItem.id}`}><h4>{item.storeItem.title}</h4></NavLink>
                                <span>{item.storeItem.description.substr(0,23) + '...'}</span>
                            </div>
                        </div>
                    </Td>
                    <Td width='132px'>
                        <input type="number" onChange={(e) => {_self._changeItemCount(i,e)}} value={item.count} className="form-control productQuantity m-input m-input--solid"  style={{height:"50px"}}/>
                    </Td>
                    <Td width='132px'>
                        <span className="productPrice g-blue">
                            {parseInt(item.storeItem.price).toFixed(2) + "$"}
                        </span>
                    </Td>
                    <Td width="50px">
                        <button onClick={() => {_self.props.onDelete(item.storeItem.id)}} className="btn btn-danger m-btn m-btn--icon btn-lg m-btn--icon-only m-btn--pill" >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Td>
                </Row>
            )
        })
    }

    _renderTotalRow(sum) {
        return (
            <div >
                <div className="m alert  m-alert--default">
                    <div className="row text-right">
                        <div className="col-md-3 text-right">
                            <h3 >{this.state.data.length + ' Items'}</h3>
                        </div>
                        <div className="col-md-6 ">
                            <div className="text-left d-inline-block">
                                <span>Total</span><br/>
                                <span className="productPrice g-blue">
                                {parseInt(sum).toFixed(2) + "$"}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex justify-content-end align-items-center">
                            <NavLink to="/shopping/checkout" className="btn m-btm btn-success">Checkout</NavLink>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

    render() {
        const {data,sum} = this.props;

        return (
          <div>
            {data.length > 0 ?

            <div className="shoppingCartTable">

                    <Table>
                        <Thead>
                        <HeadRow>
                            <Th first={true} width='10px'>#</Th>
                            <Th name='product' width='260px'>Product</Th>
                            <Th name='quantity' width='132px'>Quantity</Th>
                            <Th name='price' width='100px'>Price</Th>
                            <Th name='actions' width='50px'>Delete</Th>
                        </HeadRow>
                        </Thead>
                        <Tbody>
                        {this._renderRows(data)}
                        </Tbody>
                    </Table>
                {this._renderTotalRow(sum)}
            </div>
              :
              this._getEmptyMessage()
            }
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
