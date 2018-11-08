import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {Typography, CircularProgress} from '@material-ui/core';
import {update} from "../../../redux/schools/actions";
import {selectUpdateRequest} from "../../../redux/schools/selectors";

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class SchoolDetails extends Component {

  static propTypes = {
    school: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      school: {},
      mode: 'overview',
    }
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      school: this.props.school
    });
  }

  componentWillReceiveProps(nextProps) {
    this._handleUpdateSchool(nextProps);
  }

  _handleUpdateSchool(nextProps) {
    const prev = this.props.getUpdateRequest.get('success');
    const next = nextProps.getUpdateRequest.get('success');

    if (!prev && next) {
      this.setState({
        ...this.state,
        mode: 'overview'
      });
    }
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      school: {
        ...this.state.school,
        [name]: value
      }
    });
  }

  _handleSwitchMode(mode) {
    this.setState({mode})
  }

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.school
    );
  };

  render() {
    const { mode, school } = this.state;
    const { getUpdateRequest, t } = this.props;
    const errors = getUpdateRequest.get('errors');
    const loading = getUpdateRequest.get('loading');

    return (
      <div>
        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info m--margin-bottom-15">
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">
              {loading && <div className="m-portlet__head-title"><span className="m-portlet__head-icon"><CircularProgress style={{float: 'right'}} color="inherit"/></span></div>}
              {!loading && <div className="m-portlet__head-title">
                <span className="m-portlet__head-icon">                
                    <i className="fa fa-id-card-o"></i>
                </span>
                <h3 className="m-portlet__head-text">{t('info')}</h3>
              </div>}
            </div>
            <div className="m-portlet__head-tools">
              <ul className="m-portlet__nav">
                <li className="m-portlet__nav-item">
                  {mode === 'overview' &&                  
                    <a title={t('edit')} onClick={() => { this._handleSwitchMode('edit') }} className=" pointer m-portlet__nav-link m-portlet__nav-link--icon">
                        <i className="la la-edit"></i>
                    </a>                  
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
            {mode === 'overview' && <TabContainer>
              <div className="m-widget1 m-widget1--paddingless">
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('name')}</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__title m--font-brand">{school.schName || '-'}</span>
                    </div>
                  </div>
                </div>              
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('code')}</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__title m--font-brand">{school.schCode || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('billing')}</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__title m--font-brand">{school.billing || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('shippingAddress')}</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__title m--font-brand">{school.shippingAddress || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabContainer>}
            {mode === 'edit' && <TabContainer>
              <form id='update-school-form' onSubmit={(e) => { this._onSubmit(e) }}>
                <div className="m-form">
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="schName">{t('name')}</label>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="schName"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={school.schName || ''}
                        className="form-control m-input--air form-control-success m-input"
                        id="firsName"/>
                      {errors && errors.get('schName') && <div className="form-control-feedback text-center error">{errors.get('schName').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="m-separator m-separator--dashed"></div>
                <div className="m-form">
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="billing">{t('billing')}</label>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="billing"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={school.billing || ''}
                        className="form-control m-input--air form-control-success m-input"
                        id="firsName"/>
                      {errors && errors.get('billing') && <div className="form-control-feedback text-center error">{errors.get('billing').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="m-separator m-separator--dashed"></div>
                <div className="m-form">
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="shippingAddress">{t('shippingAddress')}</label>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="shippingAddress"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={school.shippingAddress || ''}
                        className="form-control m-input--air form-control-success m-input"
                        id="firsName"/>
                      {errors && errors.get('shippingAddress') && <div className="form-control-feedback text-center error">{errors.get('shippingAddress').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="m-separator m-separator--dashed"></div>
                <div className="text-right">
                  <button className="btn-success m-btn btn m--margin-right-10">{t('saveChanges')}</button>
                  <button className="btn-default m-btn btn" onClick={() => { this._handleSwitchMode('overview') }} >{t('cancel')}</button>
                </div>
              </form>
            </TabContainer>}
          </div>
        </div>
      </div>
    );
  }
}

SchoolDetails = connect(
  (state) => ({
    getUpdateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    update: (form, params = {}) => { dispatch(update(form, params)) },
  })
)(SchoolDetails);

export default translate('translations')(SchoolDetails);
