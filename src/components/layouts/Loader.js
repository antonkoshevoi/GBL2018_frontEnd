import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/loader.css'


class Loader extends Component {
    render() {
        console.log("LKLKLK");
        return (
            <div className="loader">
                <div className="spinner">
                    <div className="cube1"></div>
                    <div className="cube2"></div>
                </div>
            </div>
        );
    }
}

Loader.propTypes = {};

export default Loader;
