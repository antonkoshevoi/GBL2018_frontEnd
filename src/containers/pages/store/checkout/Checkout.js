import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import CartItems from '../../../../components/pages/store/checkout/CartItems';
import '../../../../styles/store.css'
import InfoDetails from '../../../../components/pages/store/checkout/InfoDetails';
import PaymentMethods from '../../../../components/pages/store/checkout/PaymentMethods';
import {selectCartRecords, selectCartRecordsSum, selectGetCartRecordsRequest} from '../../../../redux/store/selectors';
import {calculateCartSum, getCartRecords} from '../../../../redux/store/actions';
import {withRouter} from 'react-router-dom';
import {push} from 'react-router-redux';
import {
  selectCreateCheckPaymentRequest,
  selectCreatePayPalPaymentRequest
} from '../../../../redux/payments/selectors';
import {createCheckPayment, createPayPalPayment} from '../../../../redux/payments/actions';
import {Divider, Step, StepLabel, Stepper} from 'material-ui';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from 'material-ui';


import payPalImg from '../../../../media/images/payments/paypal.png'
import creditCardImg from '../../../../media/images/payments/credit_card.png'
import checkImg from '../../../../media/images/payments/check.png'
import Card from "../../../../components/ui/Card";
import ShippingAndBilling from "./ShippingAndBilling";
import PaymentSuccessContainer from "../payments/PaymentSuccessContainer";


class Checkout extends Component {

  state = {
    redirectingToPayPal: false,
    stepIndex: 0,
    finished: 0,
    payMethod: null,

  };

  componentDidMount() {
    const {cartRecords} = this.props;
    if (cartRecords.size === 0) {
      this._getCartRecords();
      this._calculateSum(cartRecords.toJS());
    }
    const {step} = this.props.match.params;
    if (step) {
      this.setState({stepIndex: +step});
    }
  }

  componentWillReceiveProps(nextProps) {
    this._handlePayPalPaymentCreated(nextProps);
    this._handleCheckPaymentCreated(nextProps);
    this._handleCheckPaymentFailed(nextProps);

    if (this.props.cartRecords !== nextProps.cartRecords) {
      this._calculateSum(nextProps.cartRecords.toJS());
    }
  }

  _getCartRecords() {
    this.props.getCartRecords();
  }

  _calculateSum(data) {
    this.props.calculateSum(data);
  }

  _stepShippingAndBilling() {
    // const {payMethod} = this.state;
    // switch (payMethod) {
    //   case 'PayPal':
    //     console.log('paypal');
    //     break;
    // }
  }

  _handleShippingAndBilling(data) {

  }

  _stepBilling = (method) => {
    const payMethod = method ? method : this.state.payMethod;

    switch (payMethod) {
      case 'Check':
        this._processCheckCreate();
        break;

      case 'PayPal':
        this._processPayPal();
        break;
    }

    this.setState({
      ...this.state,
      shippingBillingSaved: true,
    })
  };

  handleNext = () => {

    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handleBack = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }


  };

  /**
   * PayPal
   * @private
   */
  _processPayPal() {
    this.props.createPayPalPayment();
  }

  _startProcessPayPal = () => {

    this.setState({payMethod: 'PayPal'});

    this._stepBilling('PayPal');
  };

  _handlePayPalPaymentCreated(nextProps) {
    const success = this.props.createPayPalPaymentRequest.get('success');
    const nextSuccess = nextProps.createPayPalPaymentRequest.get('success');

    if (!success && nextSuccess) {
      this.setState({redirectingToPayPal: true});
      window.location = nextProps.createPayPalPaymentRequest.get('approvalUrl');
    }
  }


  _processCheck = () => {
    this.setState({payMethod: 'Check'});

    this.handleNext();

  };

  /**
   * Check
   * @private
   */
  _processCheckCreate() {
    this.props.createCheckPayment();
  }

  _handleCheckPaymentCreated(nextProps) {
    const success = this.props.createCheckPaymentRequest.get('success');
    const nextSuccess = nextProps.createCheckPaymentRequest.get('success');

    if (!success && nextSuccess) {
      this.props.goToPendingPage();
    }
  }

  _handleCheckPaymentFailed(nextProps) {
    const fail = this.props.createCheckPaymentRequest.get('fail');
    const nextFail = nextProps.createCheckPaymentRequest.get('fail');

    if (!fail && nextFail) {
      this.props.goToFailPage();
    }
  }

  render() {

    const {redirectingToPayPal, stepIndex} = this.state;
    const {
      cartRecords,
      cartRecordsRequest,
      createPayPalPaymentRequest,
      createCheckPaymentRequest,
      cartRecordsSum
    } = this.props;
    const loadingCarts = cartRecordsRequest.get('loading');
    const successCarts = cartRecordsRequest.get('success');
    return (
      <div>
        <div className='row d-flex justify-content-center'>
          <div className="col-12">
            <Card header={false}>
              <Stepper activeStep={stepIndex} alternativeLabel className="g-stepper">

                <Step>
                  <StepLabel>Payments Options</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Shipping and Biling</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Confirmation</StepLabel>
                </Step>
              </Stepper>
              {[
                (() => {
                  return (
                    //(temp) TODO need extract to component
                    <div className="row d-flex justify-content-center">
                      <div className='col-10'>
                        {successCarts &&
                        <CartItems sum={cartRecordsSum} data={cartRecords.toJS()}/>}
                        {loadingCarts && !successCarts &&
                        <div className="row d-flex justify-content-center">
                          <CircularProgress color="primary" size={80}/>
                        </div>}
                        <br/>
                        <PaymentMethods methods={[
                          {
                            title: 'PayPal',
                            img: payPalImg,
                            loading: createPayPalPaymentRequest.get('loading') || redirectingToPayPal,
                            onSelect: this._startProcessPayPal,
                          },
                          {
                            title: 'Credit Card',
                            img: creditCardImg,
                            onSelect: this._startProcessPayPal,
                          },
                          {
                            title: 'Check',
                            img: checkImg,
                            loading: createCheckPaymentRequest.get('loading'),
                            onSelect: this._processCheck,
                          },
                          {
                            title: 'WireTransfer(TT)',
                            img: checkImg,
                            // loading: createCheckPaymentRequest.get('loading'),
                            onSelect: () => {
                              this.handleNext();
                            },
                          },
                          {
                            title: 'COG',
                            img: checkImg,
                            // loading: createCheckPaymentRequest.get('loading'),
                            onSelect: () => {
                              this.handleNext();
                            },
                          },


                        ]}

                        />
                      </div>
                    </div>


                  )
                })(),

                <ShippingAndBilling onDataSaved={this._stepBilling}/>,
                <PaymentSuccessContainer/>

              ][stepIndex]}
              {stepIndex !== 0 && stepIndex !== 2 &&
              <div className="form-group">
                <Button
                  disabled={stepIndex === 0}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
                {/*<Button*/}
                {/*variant="raised"*/}
                {/*color="primary"*/}
                {/*onClick={this.handleNext}*/}
                {/*>*/}
                {/*{stepIndex === 2 ? 'Finish' : 'Next'}*/}
                {/*</Button>*/}
              </div>
              }
            </Card>

          </div>


        </div>
      </div>
    );
  }
}

Checkout = connect(
  (state) => ({
    cartRecordsRequest: selectGetCartRecordsRequest(state),
    cartRecords: selectCartRecords(state),
    cartRecordsSum: selectCartRecordsSum(state),
    createPayPalPaymentRequest: selectCreatePayPalPaymentRequest(state),
    createCheckPaymentRequest: selectCreateCheckPaymentRequest(state)
  }),
  (dispatch) => ({
    getCartRecords: () => {
      dispatch(getCartRecords())
    },
    createPayPalPayment: () => {
      dispatch(createPayPalPayment())
    },
    createCheckPayment: () => {
      dispatch(createCheckPayment())
    },
    calculateSum: (data) => {
      dispatch(calculateCartSum(data))
    },
    goToSuccessPage: () => {
      dispatch(push('/shopping/checkout/2'))
    },
    goToPendingPage: () => {
      dispatch(push('/payments/pending'))
    },
    goToFailPage: () => {
      dispatch(push('/payments/fail'))
    },
  })
)(Checkout);

export default withRouter(translate('Checkout')(Checkout));