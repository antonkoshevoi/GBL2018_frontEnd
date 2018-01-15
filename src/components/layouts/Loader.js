import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from '../../media/images/logo.png'
import '../../styles/loader.css'


class Loader extends Component {
    render() {
        const {type} = this.props;

        return (
            <div className="loaderWrapper">
                {type === 'initial' ? (
                    <div className="textLoader">
                        <svg viewBox="0 0 1000 800">

                            <symbol id="s-text">
                                <text textAnchor="middle" style={{    whiteSpace: "pre"}}
                                      x="50%" y="50%" dy=".35em">
                                    Gravity Brain
                                </text>
                            </symbol>

                            <use xlinkHref="#s-text" class="text"
                            ></use>
                            <use xlinkHref="#s-text" class="text"
                            ></use>
                            <use xlinkHref="#s-text" class="text"
                            ></use>
                            <use xlinkHref="#s-text" class="text"
                            ></use>
                            <use xlinkHref="#s-text" class="text"
                            ></use>

                        </svg>
                    </div>

                ):
                <div className="loader"></div>
                }
            </div>
        );
    }
}

Loader.propTypes = {};

export default Loader;
