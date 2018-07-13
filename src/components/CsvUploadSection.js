import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import ConfirmButton from './ui/ConfirmButton';
import { CSVLink } from 'react-csv';
import PortletWidgets from './ui/PortletWidgets';
import LinearProgress from './ui/LinearProgress';
import PortletErrorsWidgets from './ui/PortletErrorsWidgets';
import { translate } from 'react-i18next';

class CsvUploadSection extends Component {
    static propTypes = {
        schools: PropTypes.any.isRequired,
        onUpload: PropTypes.func.isRequired,
        uploadRequest: PropTypes.any.isRequired
    };

    state = {
        schoolId: undefined,
        file: undefined
    };

    _selectSchool(event) {
        this.setState({ school: event.target.value });
    }

    _renderSchools() {
        const { schools } = this.props;

        return schools.map((school, key) => (
            <MenuItem key={key} value={school.get('schId')}>
                {school.get('schName')}
            </MenuItem>
        ));
    }

    _handleSchoolChange(e) {
        document.getElementById('file-input').value = '';

        this.setState({
            schoolId: e.target.value,
            file: undefined
        });
    }

    _handleFileChange(e) {
      const { schoolRequest } = this.props;
      const schoolId = schoolRequest.get('record').toJS().schId;

      if (typeof e.target.files[0] !== 'undefined') {
            this.setState(
                {
                    file: e.target.files[0]
                },
                () => {
                    this.props.onUpload(this.state.file, schoolId);
                }
            );
        }
    }

    _hasErrors(results) {
        if (!results.get('errors')) return false;

        let errorsArr = results.get('errors').toJS();
        return Array.isArray(errorsArr) && errorsArr.length ? !!errorsArr.length : false;
    }

    render() {
        const { uploadRequest,schoolRequest, t } = this.props;
        const schoolId = schoolRequest.get('record').toJS().schId;
        const loading = uploadRequest.get('loading');
        const progress = uploadRequest.get('progress');
        const cancel = uploadRequest.get('cancel');
        const uploading = loading && progress < 100;
        const success = uploadRequest.get('success');
        const results = uploadRequest.get('results');
        const errors = this._hasErrors(results);
        const csvExampleName = this.props.csvExampleName;
        const csvTemplateHeaders = this.props.csvTemplateHeaders;
        const csvTemplateData = this.props.csvTemplateData;

        return (
            <div>
                <div className="m-portlet m-portlet--brand  m-portlet--head-solid-bg m-portlet--bordered">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                            <div className="m-portlet__head-title">
                                <span className="m-portlet__head-icon">
                                    <i className="flaticon-cogwheel-2" />
                                </span>
                                <h3 className="m-portlet__head-text">CSV</h3>
                            </div>
                        </div>
                    </div>
                    <div className="m-portlet__body">
                        <div className="row" style={{ marginBottom: '30px' }}>
                            <div className="col-sm-12">
                                <h6>{t('downloadCsvMessage')}</h6>
                                <CSVLink
                                    headers={csvTemplateHeaders}
                                    data={csvTemplateData}
                                    filename={csvExampleName}
                                    className="btn btn-success"
                                >
                                    {t('download')}
                                </CSVLink>
                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: 0 }}>
                            <div className={`col-md-6 ${loading || !schoolId ? ' not-allowed' : ''}`}>
                                <div className={`react-csv-input ${loading || !schoolId ? ' disabled' : 'fdsfsf'}`}>
                                    <label>{t('selectCsvFile')}</label>
                                    <input
                                        id="file-input"
                                        className="csv-input"
                                        type="file"
                                        accept="text/csv"
                                        onChange={e => this._handleFileChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        {loading && (
                            <div className="row" style={{ marginTop: '10px' }}>
                                <div className="col-sm-12">
                                    {!uploading && <LinearProgress color="primary" />}
                                    {uploading && <LinearProgress mode="determinate" value={progress} />}
                                    {cancel &&
                                        uploading && (
                                            <ConfirmButton
                                                className="m--margin-top-10 btn mt-btn mt-btn-danger"
                                                onClick={() => {
                                                    cancel('canceled by user');
                                                }}
                                            >
                                                {t('cancel')}
                                                <i className="la la-close m--margin-left-5" />
                                            </ConfirmButton>
                                        )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 m--margin-top-10">
                        {success && (
                            <PortletWidgets
                                data={[
                                    {
                                        title: t('total'),
                                        value: results.get('total'),
                                        colorName: 'info'
                                    },
                                    {
                                        title: t('inserted'),
                                        value: results.get('inserted'),
                                        colorName: 'success'
                                    },
                                    {
                                        title: t('failed'),
                                        value: results.get('failed'),
                                        colorName: 'danger'
                                    }
                                ]}
                                title={t('results')}
                                icon="flaticon-list-3"
                            />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">{errors && <PortletErrorsWidgets errors={results.get('errors')} />}</div>
                </div>
            </div>
        );
    }
}

export default translate('translations')(CsvUploadSection);
