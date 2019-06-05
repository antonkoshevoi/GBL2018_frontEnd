import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import OpenInvoicesTable from '../../components/store/OpenInvoicesTable';
import { deleteFromCartRequest, selectGetCartRecordsRequest } from '../../redux/store/selectors';
import { deleteCartRecord, getCartRecords, setItemQuantity } from '../../redux/store/actions';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/layouts/Loader';

class ShoppingCart extends Component {
  componentDidMount() {    
    this.props.getRecords();
  }

  render() {
    const {      
      cartRecordsRequest,                
      deleteRequest,
      t
    } = this.props;
    const loading = cartRecordsRequest.get('loading') || deleteRequest.get('loading');
    const success = cartRecordsRequest.get('success');
    return (
      <div className='fadeInLeft animated'>
            <div className="m-portlet m-portlet--full-height">
                {loading && <Loader/>}
                <div className='m-portlet__head border-b-green'>
                    <div className='m-portlet__head-caption'>
                        <div className='m-portlet__head-title'>
                            <span className='m-portlet__head-icon'><i className='fa fa-shopping-cart'></i></span>
                            <h3 className='m-portlet__head-text'>{t('shoppingCart')}</h3>
                        </div>
                    </div>
                </div>
              <div className="m-portlet__body">
                {success &&
                <div>
                    <OpenInvoicesTable                   
                      sum={cartRecordsRequest.get('totalPrice')}
                      setQuantity={(data) => this.props.setQuantity(data)}                      
                      onDelete={(id) => this.props.deleteCartRecord(id)}
                      data={cartRecordsRequest.get('records').toJS()}
                    />
                   <div className="row">
                     <div className="col-md-12 text-right">
                       <div className="form-group-inline btn-group">
                         <NavLink to="/store" className="btn m-btm btn-primary">{t('continueShopping')}</NavLink>
                         <NavLink to="/shopping/checkout" className="btn m-btm btn-success">{t('checkout')}</NavLink>
                       </div>
                     </div>
                   </div>
                </div>
                }
              </div>
            </div>
          </div>
    );
  }
}

ShoppingCart = connect(
  (state) => ({
    cartRecordsRequest: selectGetCartRecordsRequest(state),    
    deleteRequest: deleteFromCartRequest(state),
  }),
  (dispatch) => ({
    getRecords: () => { dispatch(getCartRecords()) },
    deleteCartRecord: (id) => { dispatch(deleteCartRecord(id)) },        
    setQuantity: (data) => { dispatch(setItemQuantity(data))  },
  })
)(ShoppingCart);

export default withTranslation('translations')(ShoppingCart);