import React, {Component} from 'react';
import SubHeader from "./SubHeader";

class Wrapper extends Component {
    render() {
        return (
            <div className="m-grid__item m-grid__item--fluid m-wrapper">
                <SubHeader/>
                <div className="m-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default Wrapper;
