import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/widgets.css';


class PortletWidgets extends Component {


    _isFloatNumber(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    _renderWidgetItems() {
        const fieldsCount = 12 / this.props.data.length;
        let basisPercent = 0;
        if (this._isFloatNumber(fieldsCount)) {
            basisPercent = (100 / this.props.data.length) + '%';
        }
        return this.props.data.map(function (item, i) {
            return (
                <div className={`col-md-12 col-lg-6 col-xl-${fieldsCount}`} key={i}
                     style={(basisPercent !== 0 ? {flexBasis: basisPercent} : {})}>
                    <div className="m-widget24">
                        <div className="m-widget24__item">
                            <h4 className="m-widget24__title">
                                {item.title}
                            </h4><br/>
                            <span className="m-widget24__desc">
                                {item.desc}
                                    </span>
                            <br/>
                            <small className="m-widget24__desc second_desc">
                                {item.secondDesc}
                            </small>
                            <span className="m-widget24__stats m--font-brand">
                                      <i className={`${(item.icon !== undefined) ? item.icon : (item.value !== undefined) ? 'widget_value' : ''}  m--font-${item.colorName}`}>
                                          {(item.value !== undefined) ? item.value : ''}
                                      </i>
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {

        return (
            <div className={"m-portlet m-portlet--head-solid-bg m-portlet--" + this.props.colorName}>
                <div className={`m-portlet__head ${(this.props.title === undefined) ? 'm--hide' : ''}`}>
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title"><span className="m-portlet__head-icon"><i
                            className={this.props.icon}></i></span>
                            <h3 className="m-portlet__head-text">
                                {this.props.title}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="m-portlet__body  m-portlet__body--no-padding">
                    <div className="row m-row--no-padding m-row--col-separator-xl">
                        {this._renderWidgetItems()}
                    </div>
                </div>
            </div>
        );
    }
}

PortletWidgets.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    colorName: PropTypes.string
};

PortletWidgets.defaultProps = {
    colorName:'brand'
};

export default PortletWidgets;
