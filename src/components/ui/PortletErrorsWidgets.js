import React from 'react';
import '../../styles/widgets.css';

export default class PortletErrorsWidgets extends React.Component {
    _renderErrorItems(errorsList) {
        if (errorsList) {
            return errorsList.toJS().map((item, index) => {
                return (
                    <li key={index}>
                        Error in line {item.line}
                        {Object.keys(item.error).map((typeError, typeIndex) => (
                            <span key={typeIndex}>
                                {' '}
                                {item.error[typeError].map((message, i) => (
                                    <span key={i}>
                                        <br />
                                        {message}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </li>
                );
            });
        }
    }
    render() {
        return (
            <div className="m-portlet m-portlet--brand  m-portlet--head-solid-bg m-portlet--bordered">
                <div className={'m-portlet m-portlet--head-solid-bg m-portlet--brand'}>
                    <div className={`m-portlet__head`}>
                        <div className="m-portlet__head-caption">
                            <div className="m-portlet__head-title">
                                <span className="m-portlet__head-icon">
                                    <i className="material-icons">error</i>
                                </span>
                                <h3 className="m-portlet__head-text">Error list</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-portlet__body  m-portlet__body--no-padding">
                    <div className="row m-row--no-padding m-row--col-separator-xl">
                        <ul className="csv-upload-errors">{this._renderErrorItems(this.props.errors)}</ul>
                    </div>
                </div>
            </div>
        );
    }
}
