import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';
import {update} from "../../../redux/schools/actions";
import {selectUpdateRequest} from "../../../redux/schools/selectors";

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

  componentDidUpdate(prevProps) {
    this._handleUpdateSchool(prevProps);
  }

  _handleUpdateSchool(prevProps) {
    const success = this.props.getUpdateRequest.get('success');    

    if (success && !prevProps.getUpdateRequest.get('success')) {
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
        <div className="m-portlet m-portlet--head-solid-bg m-portlet--brand mb-3">
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">              
              <div className="m-portlet__head-title">
                <span className="m-portlet__head-icon">                
                   {loading ? <CircularProgress color="inherit"/> : <i className="fa fa-id-card-o display-5"></i>}
                </span>
                <h3 className="m-portlet__head-text">{t('info')}</h3>
              </div>
            </div>
            <div className="m-portlet__head-tools">
              <ul className="m-portlet__nav">
                <li className="m-portlet__nav-item">
                  {mode === 'overview' &&                  
                    <button title={t('edit')} onClick={() => { this._handleSwitchMode('edit') }} className=" pointer m-portlet__nav-link m-portlet__nav-link--icon">
                        <i className="la la-edit display-5"></i>
                    </button>
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="m-portlet__body p-2">
            {mode === 'overview' && <div>
              <div className="m-widget1">
                <div className="m-widget1__item">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('name')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{school.schName || '-'}</span>
                    </div>
                  </div>
                </div>              
                <div className="m-widget1__item">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('code')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{school.schCode || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('billing')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{school.billing || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('shippingAddress')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{school.shippingAddress || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            {mode === 'edit' && <div>
              <form id='update-school-form' className="m-4" onSubmit={(e) => { this._onSubmit(e) }}>
                <div className="m-form mt-4">
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="schName">{t('name')}</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="schName"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={school.schName || ''}
                        className="form-control m-input"
                        id="firsName"/>
                      {errors && errors.get('schName') && <div className="form-control-feedback text-center error">{errors.get('schName').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="billing">{t('billing')}</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="billing"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={school.billing || ''}
                        className="form-control m-input"
                        id="firsName"/>
                      {errors && errors.get('billing') && <div className="form-control-feedback text-center error">{errors.get('billing').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="shippingAddress">{t('shippingAddress')}</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="shippingAddress"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={school.shippingAddress || ''}
                        className="form-control m-input"
                        id="firsName"/>
                      {errors && errors.get('shippingAddress') && <div className="form-control-feedback text-center error">{errors.get('shippingAddress').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="m-separator"></div>
                <div className="text-right">
                  <button className="btn-success btn mr-3" disabled={loading}>{t('saveChanges')}</button>
                  <button className="btn-default btn" onClick={() => { this._handleSwitchMode('overview') }} >{t('cancel')}</button>
                </div>
              </form>
            </div>}
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

export default withTranslation('translations')(SchoolDetails);
