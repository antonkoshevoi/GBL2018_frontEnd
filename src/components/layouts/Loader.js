import React, {Component} from 'react';
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
                                <text textAnchor="middle" style={{ whiteSpace: "pre"}} x="50%" y="50%" dy=".35em">
                                    BZabc
                                </text>
                            </symbol>
                            <use xlinkHref="#s-text" className="text" ></use>
                            <use xlinkHref="#s-text" className="text"></use>
                            <use xlinkHref="#s-text" className="text"></use>
                            <use xlinkHref="#s-text" className="text"></use>
                            <use xlinkHref="#s-text" className="text"></use>
                        </svg>
                    </div>

                ):
                <div className="loader"></div>
                }
            </div>
        );
    }
}

export default Loader;
