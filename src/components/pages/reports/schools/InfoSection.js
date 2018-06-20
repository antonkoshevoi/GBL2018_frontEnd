import React, {Component} from 'react';
import {CircularProgress} from '@material-ui/core';

class InfoSection extends Component {

    _renderRosterStats() {

        const stats  = this.props.data;
        const loading  = this.props.loading;

        return stats.map(function (item,i) {

            return (
                <div key={i} className="m-widget1__item">
                    <div className="row m-row--no-padding align-items-center">
                        <div className="col">
                            <h3 className="m-widget1__title">{item.title}</h3>
                        </div>
                        <div className="col m--align-right">
                            <span className="m-widget1__number m--font-brand">
                                { loading && <CircularProgress size={17} color="primary"/> }
                                { !loading && item.value }
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {

        const loading  = this.props.loading;

        return (

                <div className="m-widget1 m-widget1--paddingless">
                    <div className="m-widget1 m-widget1--paddingless">
                        {this._renderRosterStats()}
                    </div>
                </div>

        );
    }
}

InfoSection.propTypes = {};

export default InfoSection;
