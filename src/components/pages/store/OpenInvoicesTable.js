import React, {Component} from 'react';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../ui/table";
import PropTypes from 'prop-types';
import "../../../styles/store.css"
import {NavLink} from "react-router-dom";
import DeleteButton from "../../ui/DeleteButton";
import {debounce} from "../../../helpers/utils";

class OpenInvoicesTable extends Component {

  static propTypes = {
    preview: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
    preview: false,
  };


  state = {
    data: this.props.data,
    total: 0
  };

  componentWillMount() {
    const {data} = this.props;
    this.setState({total: this._getTotalSum(data)});
  }

  _updateData(data) {
    const total = this._getTotalSum(data);
    this.setState({data});
    this.setState({total});
    this.props.onUpdate(data, total)
  }

  _removeItem(idx) {
    this.state.data.splice(idx, 1);
    this.setState({data: this.state.data})
  }

  _changeItemCount(idx, e) {
    let data = this.state.data;
    if (e.target.value < 1) return;
    data[idx]['count'] = e.target.value;
    this._updateData(data);
    debounce(()=>this.props.setQuantity(data[idx]),1000)();

  }

  _getTotalSum(products) {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      if (isNaN(products[i].storeItem.price)) {
        continue;
      }
      total += (Number(products[i].storeItem.price) * Number(products[i].count));
    }
    return total;
  }


  _getEmptyMessage() {
    return (
      <div className="m--padding-20">
        <h2 className="text-center m--padding-10">No Open invoices</h2>
      </div>
    )
  }

  _renderTableHomerooms(homerooms) {
    return homerooms.map((homeroom,i) => <span key={i} className="d-block productLabel font-weight-normal text-center">{homeroom.name}</span>)
  }

  _renderRows(rows, preview) {
    const _self = this;


    return rows.map(function (item, i) {

      return (
        <Row index={i} key={i}>
          <Td first={true} width='10px'>{i + 1}</Td>
          <Td width='400px'>
            <div className="productInfo">
              <div className="productImg">
                <img src={item.storeItem.thumbnail} className="img-responsive" alt=""/>
              </div>
              <div className="productContent">
                <NavLink to={`/store/details/${item.storeItem.id}`}><h5>{item.storeItem.title}</h5></NavLink>
                <span>{item.storeItem.description.substr(0, 50) + '...'}</span>
               <div className="d-block" style={{ 'marginTop':'15px'}}>
                 <DeleteButton
                   onClick={() => {   _self.props.onDelete (item.id) }}
                   title={`Are you sure you want to delete ${item.storeItem.title} ${item.classroom ? `for ${item.classroom.crm_name}?` : `?`} `}
                   icon={false}
                   btnName={"Delete"}
                   classNameBtn="productLink g-blue"
                 />
               </div>
              </div>
            </div>
          </Td>
          {!preview &&
          <Td width="100px">
            <span className="productLabel font-weight-normal text-center">
               { item.classroom ? item.classroom.crm_name : ''}
            </span>
          </Td>
          }
          {!preview &&
          <Td width="100px" classNames="text-center">
            {item.classroom && _self._renderTableHomerooms(item.classroom.homerooms)}
          </Td>
          }

          <Td width='132px'>
            {!item.isInvoice &&
            <input
              type="number"
              onChange={(e) => {
                _self._changeItemCount(i, e)
              }}
              value={item.count}
              className="form-control productQuantity productLabel m-input m-input--solid"
              style={{height: "50px"}}/>
            }
            {item.isInvoice &&
            <span className="productLabel text-center">{item.count}</span>
            }


          </Td>
          <Td width='100px'>
            {/*<span className="productPrice productLabel">*/}
              {/*{'$' + parseInt(item.storeItem.price).toFixed(2)}*/}
            {/*</span>*/}
            <span className="productPrice productLabel">
              {item.storeItem.discount != 0 &&
             <span>${parseFloat(item.storeItem.price).toFixed(2)}
              <span className="discount"></span>
             </span>
              }
              <br/>
              <div className="price productLabel">
                ${parseFloat(item.storeItem.discountPrice).toFixed(2)}
              </div>
            </span>
          </Td>
          <Td width='100px'>
            <span className="productPrice productLabel">
              {'$' + parseFloat(item.storeItem.discountPrice * item.count).toFixed(2)}
            </span>
          </Td>
        </Row>
      )
    })
  }

  _renderTotalRow(sum,count) {
    return (
      <div>
        <div className="m alert  ">
          <div className="row text-right">
            <div className="col-md-2 text-center">
              <h3>{count + ' Items'}</h3>
            </div>
            <div className="col-md-10">
              <div className="text-left d-inline-block">
                <span>Total</span><br/>
                <span className="productPrice">
                {'$' + parseFloat(sum).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
  _renderTaxRow(tax = 0) {
    return (
      <div>
        <div className="m alert m-alert--default">
          <div className="row text-right">
            <div className="col-md-4">
              <div className="row text-left d-flex justify-content-center flex-column productTax">
                <h4>Shipping & Tax</h4>
              </div>
            </div>
            <div className="col-md-8">
              <div className="text-left d-inline-block  ">
                <span className="productTaxPrice">
                {'$' + parseFloat(tax).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }

  render() {
    const {data, sum,preview} = this.props;
    return (
      <div>
        {data.length > 0 ?

          <div className="shoppingCartTable">
            <Table>
              <Thead>
              <HeadRow>
                <Th first={true} width='10px'>#</Th>
                <Th name='product' width='400px'>Product</Th>
                {!preview && <Th name='quantity' width='100px' classNames="text-center">Classroom</Th>}
                {!preview && <Th name='quantity' width='100px' classNames="text-center">Homeroom</Th>}
                <Th name='quantity' width='132px' classNames="text-center">Quantity</Th>
                <Th name='price' width='100px'>Price</Th>
                <Th name='actions' width='100px'>Total</Th>
              </HeadRow>
              </Thead>
              <Tbody>
              {this._renderRows(data,preview)}
              </Tbody>
            </Table>
            {this._renderTaxRow(0)}
            {this._renderTotalRow(sum,data.length)}
            {!preview &&
            <div className="row d-flex justify-content-end ">
              <div className="col-md-4 d-flex justify-content-end align-items-center">
                <div className="form-group-inline btn-group">
                  <NavLink to="/store" className="btn m-btm btn-primary">Continue shopping</NavLink>
                  <NavLink to="/shopping/checkout" className="btn m-btm btn-success">Checkout</NavLink>
                </div>
              </div>
            </div>
            }

          </div>
          :
          this._getEmptyMessage()
        }
      </div>
    );
  }
}

export default OpenInvoicesTable;
