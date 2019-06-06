import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import {Divider} from '@material-ui/core';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../../components/ui/table";
import {Price} from "../../../components/ui/Price";
import {Preloader} from '../../../components/ui/Preloader';
import Loader from '../../../components/layouts/Loader';
import DeleteButton from "../../../components/ui/DeleteButton";
import HasRole from "../../middlewares/HasRole";
import {debounce} from "../../../helpers/utils";
import {deleteFromCartRequest, selectGetCartRecordsRequest} from '../../../redux/store/selectors';
import {deleteCartRecord, getCartRecords, setItemQuantity} from '../../../redux/store/actions';

import "../../../styles/store.css"

class ShoppingCardItems extends Component {

    state = {
        data: [],
        total: 0
    };
    
    componentDidMount() {    
        this.props.getRecords();
    }    

    componentWillReceiveProps(nextProps) {
        if ((!this.props.cartRecordsRequest.get('success') && nextProps.cartRecordsRequest.get('success')) 
                || (nextProps.cartRecordsRequest.get('records').size !== this.props.cartRecordsRequest.get('records').size)) {
            const data = nextProps.cartRecordsRequest.get('records').toJS();
            this.setState({data});
        }
    }

    _deleteItem(id) {
        this.props.deleteCartRecord(id)
    }

    _changeItemCount(idx, e) {
        let data = this.state.data;
        
        if (e.target.value < 1) {
            return;
        }
        
        data[idx]['count'] = e.target.value;
        
        this.setState({data});
        
        debounce(() => this.props.setQuantity(data[idx]), 1000)();
    }   
    
    _itemInfo(item) {
        const {t, preview} = this.props;
        
        return <div className="productInfo">
            <div className="user-avatar">
                <img src={item.storeItem.thumbnail} className="img-responsive" alt=""/>
            </div>
            <div>
                <NavLink to={`/store/details/${item.storeItem.id}`}><h5>{item.storeItem.title}</h5></NavLink>
                <p>{preview ? (item.storeItem.description.substr(0, 50) + '...') : item.storeItem.description}</p>                
                <DeleteButton
                    onClick={() => this._deleteItem(item.id)}
                    title={t('deleteItemFromCartConfirmation', {item: item.storeItem.title})}
                    icon={false}
                    btnName={t('delete')}
                    className="g-blue btn-link"
                    />                
            </div>
        </div>;
    }
    
    _renderRows(rows) {
        const {preview} = this.props;

        return rows.map((item, i) => {
            const countInput = <input
                type='number'
                onChange={(e) => this._changeItemCount(i, e)}
                value={item.count}
                className={`form-control productQuantity productLabel m-input m-input--solid ${preview ? 'margin-0' : ''}`} />;

            return preview ? <Row index={i} key={i}>
                <Td>
                    {this._itemInfo(item)}
                </Td>            
                <Td>                                            
                    <div className="m--margin-top-5 m--margin-bottom-10">
                        <Price price={item.storeItem.discountPrice} currency={item.storeItem.currency} />              
                    </div>              
                    <div className="m--margin-top-5 m--margin-bottom-10">
                        {!item.isInvoice ? countInput : <span className="productLabel">{item.count}</span>}                    
                    </div>
                    <Divider className="m--margin-bottom-10" />                        
                </Td>
            </Row> 
            : 
            <Row index={i} key={i}>
                <Td width='10px'>{i + 1}</Td>
                <Td width='400px'>{this._itemInfo(item)}</Td>
                <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
                    <Td width="132px">
                        <span className="productLabel font-weight-normal text-center">
                            { item.classroom || '-'}
                        </span>
                    </Td>
                </HasRole>
                <Td width='132px'>
                    {!item.isInvoice ? countInput : <span className="productLabel text-center">{item.count}</span>}            
                </Td>
                <Td width='100px'>
                    <div className="productPrice productLabel">
                        {item.storeItem.discount > 0 &&
                            <div>
                                <Price price={item.storeItem.price} currency={item.storeItem.currency} />
                                <span className="discount"></span>
                            </div>
                        }              
                        <div className="price productLabel">
                            <Price price={item.storeItem.discountPrice} currency={item.storeItem.currency} />                
                        </div>
                    </div>
                </Td>
                <Td width='100px'>
                    <span className="productPrice productLabel">
                        <Price price={(item.storeItem.discountPrice * item.count)} currency={item.storeItem.currency} />
                    </span>
                </Td>
            </Row>                                
        });
    }

    _renderTotalRow() {
        const {t, cartRecordsRequest} = this.props;        

        return (
            <div className="row text-right m--margin-top-15 m--margin-bottom-10">
                <div className="col-sm-7 text-left">
                    <h4 className="m--margin-left-15">{t('itemsCount', {count: cartRecordsRequest.get('records').size})}</h4>
                </div>
                <div className="col-sm-5 text-right">
                    <div className="m--margin-right-15">
                        <span>{t('total')}</span><br/>
                        <span className="productPrice">
                            <Price price={cartRecordsRequest.get('totalPrice')} currency={cartRecordsRequest.get('currency')} />  
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {preview, t, cartRecordsRequest, deleteRequest} = this.props;
        const {data} = this.state;
        

        const loading = cartRecordsRequest.get('loading') || deleteRequest.get('loading');
        const success = cartRecordsRequest.get('success');
        
        if (!success) {
            return <Preloader text={t('loading')} />;
        }
    
        return (
            <div>    
                {loading && <Loader />}                
                {data.length > 0 ?
                    <div className={`shoppingCartTable ${preview ? 'preview' : ''}`}>
                        <Table>
                            <Thead>
                            {preview ? 
                                <HeadRow>
                                    <Th>{t('product')}</Th>
                                    <Th>{t('total')}</Th>
                                </HeadRow> 
                            : 
                                <HeadRow>
                                    <Th width='10px'>#</Th>
                                    <Th width='400px'>{t('product')}</Th>
                                    <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
                                        <Th width='132px' className="text-center">{t('classroom')}</Th>
                                    </HasRole>
                                    <Th width='132px' className="text-center">{t('quantity')}</Th>
                                    <Th width='100px'>{t('price')}</Th>  
                                    <Th width='100px'>{t('total')}</Th>
                                </HeadRow>
                            }                                            
                            </Thead>
                            <Tbody>
                                {this._renderRows(data, preview)}
                            </Tbody>
                        </Table>
                        <Divider />
                        {this._renderTotalRow()}
                    </div>
                    :
                    <div className="m--padding-50">
                        <h2 className="text-center">{t('noOpenInvoices')}</h2>
                    </div>
                }
                {(data.length > 0 || !preview) &&
                <div className="row">
                    <div className="col-md-12 text-right">
                        <div className="form-group-inline btn-group">
                            <NavLink to="/store" className="btn m-btm btn-primary">{t('continueShopping')}</NavLink>
                            {data.length > 0 && <NavLink to="/shopping/checkout" className="btn m-btm btn-success">{t('checkout')}</NavLink>}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

ShoppingCardItems = connect(
  (state) => ({
    cartRecordsRequest: selectGetCartRecordsRequest(state),    
    deleteRequest: deleteFromCartRequest(state),
  }),
  (dispatch) => ({
    getRecords: () => { dispatch(getCartRecords()) },
    deleteCartRecord: (id) => { dispatch(deleteCartRecord(id)) },        
    setQuantity: (data) => { dispatch(setItemQuantity(data))  },
  })
)(ShoppingCardItems);

export default withTranslation('translations')(ShoppingCardItems);
