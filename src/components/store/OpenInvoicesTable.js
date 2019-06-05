import React, {Component} from 'react';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../ui/table";
import {Price} from "../ui/Price";
import PropTypes from 'prop-types';
import "../../styles/store.css"
import {NavLink} from "react-router-dom";
import DeleteButton from "../ui/DeleteButton";
import {debounce} from "../../helpers/utils";
import {withTranslation} from 'react-i18next';
import {Divider} from '@material-ui/core';

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length !== this.props.data.length) {
            const {data} = nextProps;     
            this.setState({data});
        }
    }
   
    _updateData(data) {    
        this.setState({data});  
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
    debounce(() => this.props.setQuantity(data[idx]),1000)();
  }

  _getEmptyMessage() {
    const {t} = this.props;
    return (
      <div className="m--padding-20">
        <h2 className="text-center m--padding-10">{t('noOpenInvoices')}</h2>
      </div>
    )
  }

  _renderRows(rows, preview) {    
    const {t} = this.props;

    return rows.map((item, i) => {
        
        const countInput = <input
              type="number"
              onChange={(e) => { this._changeItemCount(i, e) }}
              value={item.count}
              className={`form-control productQuantity productLabel m-input m-input--solid ${preview ? 'margin-0' : ''}`} />;
        
      return (item && item.storeItem &&
        <Row index={i} key={i}>
          {!preview && <Td width='10px'>{i + 1}</Td>}
          <Td width='400px'>
            <div className="productInfo">
              <div className="user-avatar">
                <img src={item.storeItem.thumbnail} className="img-responsive" alt=""/>
              </div>
              <div>
                <NavLink to={`/store/details/${item.storeItem.id}`}><h5>{item.storeItem.title}</h5></NavLink>
                <span>{preview ? (item.storeItem.description.substr(0, 50) + '...') : item.storeItem.description}</span>
                <div className="d-block m--margin-top-15">
                  <DeleteButton
                    onClick={() => { this.props.onDelete (item.id) }}
                    title={t('deleteItemFromCartConfirmation', {item: item.storeItem.title})}
                    icon={false}
                    btnName={t('delete')}
                    className="productLink g-blue btn-link"
                  />
                </div>
              </div>
            </div>  
          </Td>
          {!preview &&
          <Td width="132px">
            <span className="productLabel font-weight-normal text-center">
               { item.classroom || '-'}
            </span>
          </Td>
          }
          {!preview &&
          <Td width='132px'>
            {!item.isInvoice ? countInput : <span className="productLabel text-center">{item.count}</span>}            
          </Td>}
          {!preview &&
          <Td width='100px'>
            <span className="productPrice productLabel">
              {item.storeItem.discount > 0 &&
             <div>
                <Price price={item.storeItem.price} currency={item.storeItem.currency} />
                <span className="discount"></span>
             </div>
              }              
              <div className="price productLabel">
                <Price price={item.storeItem.discountPrice} currency={item.storeItem.currency} />                
              </div>
            </span>
          </Td>}
          <Td width='100px'>
          {preview && <div>                          
              <div className="m--margin-top-5 m--margin-bottom-10">
                <Price price={item.storeItem.discountPrice} currency={item.storeItem.currency} />              
              </div>              
              <div className="m--margin-top-5 m--margin-bottom-10">
                {!item.isInvoice ? countInput : <span className="productLabel">{item.count}</span>}                    
              </div>
              <Divider className="m--margin-bottom-10" />
            </div>}
            <span className="productPrice productLabel">
                <Price price={(item.storeItem.discountPrice * item.count)} currency={item.storeItem.currency} />
            </span>
          </Td>
        </Row>
      )
    });
  }

  _renderTotalRow(sum, data) {
    const {t} = this.props;
    const count = data.length;
    const item =  data[0];
    
    return (
        <div className="row text-right m--margin-top-15 m--margin-bottom-10">
            <div className="col-sm-7 text-left">
              <h4 className="m--margin-left-15">{t('itemsCount', {count: count})}</h4>
            </div>
            <div className="col-sm-5 text-right">
                <div className="m--margin-right-15">
                    <span>{t('total')}</span><br/>
                    <span className="productPrice">
                       <Price price={sum} currency={item.storeItem.currency} />  
                    </span>
                </div>
            </div>
        </div>            
    );
  }

  render() {
    const {sum, preview, t} = this.props;    
    const {data} = this.state;
    return (
      <div>
        {data.length > 0 ?
          <div className={`shoppingCartTable ${preview ? 'preview' : ''}`}>
            <Table>
              <Thead>
              <HeadRow>
                {!preview && <Th width='10px'>#</Th>}
                <Th name='product' width='400px'>{t('product')}</Th>
                {!preview && <Th name='quantity' width='132px' className="text-center">{t('classroom')}</Th>}                
                {!preview && <Th name='quantity' width='132px' className="text-center">{t('quantity')}</Th>}  
                {!preview && <Th name='price' width='100px'>{t('price')}</Th>}  
                <Th name='actions' width='100px'>{t('total')}</Th>
              </HeadRow>
              </Thead>
              <Tbody>
              {this._renderRows(data,preview)}
              </Tbody>
            </Table>
            <Divider />
            {this._renderTotalRow(sum, data)}
          </div>
          :
          this._getEmptyMessage()
        }
      </div>
    );
  }
}

export default withTranslation('translations')(OpenInvoicesTable);
