import React, {Component} from 'react';
import SubHeader from "../../containers/ui/SubHeader";
import {withRouter} from "react-router-dom"
import Loader from "./Loader";

class Wrapper extends Component {

    state = {
        isLoading:false
    }


    render() {
        const { history } = this.props

        history.listen((location, action) => {
            const _self = this;
            _self.setState({isLoading:true});
            setTimeout(function () {
                _self.setState({isLoading:false});
            },1500)
        });

        return (
            <div className="m-grid__item m-grid__item--fluid m-wrapper">
               
                <div className="m-content">
                    {/*{this.state.isLoading && <Loader/> }*/}
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default withRouter(Wrapper);

