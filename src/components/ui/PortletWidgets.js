import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PortletWidgets extends Component {

    _isFloatNumber(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    _renderWidgetItems() {
        const fieldsCount = this.props.fullWidth ? 12 : 12 / this.props.data.length;

        let basisPercent = 0;
        if (this._isFloatNumber(fieldsCount)) {
            basisPercent = (100 / this.props.data.length) + '%';
        }
        return this.props.data.map(function (item, i) {
            return (
                <div className={`col-md-12 col-lg-6 col-xl-${fieldsCount}`} key={i} style={(basisPercent !== 0 ? {flexBasis: basisPercent} : {})}> 
                    <span className="pull-right m--margin-10 m--margin-right-30">
                        <span className={`display-3 m--font-${item.colorName}`}>
                            {item.value || '-'}
                        </span>
                    </span>
                    <h5 className="pull-left m--margin-10">
                        {item.title}
                    </h5>
                </div>
            )
        })
    }

    render() {

        return (
            <div className={"m-portlet m-portlet--head-solid-bg m-portlet--bordered m-portlet--" + this.props.colorName}>
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
                <div className="m-portlet__body p-0">
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
    colorName:'brand',
    fullWidth:false
};

export default PortletWidgets;
