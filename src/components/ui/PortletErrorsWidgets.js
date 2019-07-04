import React from 'react';

export default class PortletErrorsWidgets extends React.Component {
    _renderErrorItems(errorsList) {
        if (errorsList) {
            return errorsList.toJS().map((item, index) => {
                return (
                    <div key={index}>
                        Error in line {item.line}:
                        {Object.keys(item.error).map((typeError, typeIndex) => (
                            <span key={typeIndex}>                                
                                {item.error[typeError].map((message, i) => (
                                    <span key={i}>                                        
                                        {message}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </div>
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
                <div className="m-portlet__body p-0">
                    <div className="row m-row--no-padding m-row--col-separator-xl">
                        <div className="csv-upload-errors">{this._renderErrorItems(this.props.errors)}</div>
                    </div>
                </div>
            </div>
        );
    }
}
