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
  selectCreatePayPalPaymentRequest, selectPaymentMethod
} from '../../../../redux/payments/selectors';
import {createCheckPayment, createPayPalPayment, setPayType} from '../../../../redux/payments/actions';
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

const styles = () => ({
  iconContainer: {}
});

class Checkout extends Component {

  state = {
    redirectingToPayPal: false,
    stepIndex: 0,
    finished: 0,
    payMethod: null,

  };


  componentWillMount() {
    const {step} = this.props.match.params;
    if (step) {
      this.setState({stepIndex: +step});
    }
  }

  componentWillReceiveProps(nextProps) {
    this._handlePayPalPaymentCreated(nextProps);
    this._handleCheckPaymentCreated(nextProps);
    this._handleCheckPaymentFailed(nextProps);


  }

  _stepBilling = () => {
    const payMethod = this.props.payMethod;

    switch (payMethod) {
      case 'Check':
        this._processCheckCreate();
        break;

      case 'PayPal':
        this._processPayPal();
        break;
    }

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

    this.props.setPayMethod('PayPal');


    this._stepBilling();
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
    this.props.setPayMethod('Check');
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
      this.handleNext();
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
    const {classes} = this.props;
    const item = cartRecords.toJS().shift();
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
                  <StepLabel classes={{...classes}}>Shipping and Billing</StepLabel>
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
                        <div className="m-portlet__body">
                          <div className="m-widget25">
                            {item &&
                              <span className="invoice-title">Yor invoice {item.invoiceNo} Total ${cartRecordsSum}</span>
                            }
                          </div>
                        </div>
                        }

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
    createCheckPaymentRequest: selectCreateCheckPaymentRequest(state),
    payMethod: selectPaymentMethod(state)
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
    goToFailPage: () => {
      dispatch(push('/payments/fail'))
    },
    setPayMethod: (data) => {
      dispatch(setPayType(data))
    }
  })
)(withStyles(styles)(Checkout));

export default withRouter(translate('Checkout')(Checkout));