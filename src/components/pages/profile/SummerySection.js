import React, {Component} from 'react';
import * as AUTH from '../../../services/AuthService'
import {randColorName} from "../../../helpers/colors";

class SummerySection extends Component {

    state = {
        ...this.props.data
    };

    handleChange = (event, key) => {
        this.setState({ [key]:event.target.value });
    };



    _renderList(list) {
        return list.map(function (item,i) {
            return (
                <div  key={i} className="m-timeline-2 my-timeline">
                    <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
                        <div className="m-timeline-2__item m--margin-bottom-10">
                            <div className="m-timeline-2__item-cricle">
                                <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
                            </div>
                            <div className="m-timeline-2__item-text  m--padding-top-5">
                                {item.name}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {

        const {schools,homerooms,classrooms} = this.props.data;

        return (
            <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
						<span className="m-portlet__head-icon">
							<i className='flaticon-list-2'></i>
						</span>
                            <h3 className="m-portlet__head-text">
                                Summery
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="m-portlet__body">
                           <h3>Schools</h3>
                            {this._renderList(schools)}
                            <h3>Homerooms</h3>
                            {this._renderList(homerooms)}
                            <h3>Classrooms</h3>
                            {this._renderList(classrooms)}
                        </div>
                    </div>

        );
    }
}

SummerySection.propTypes = {};

export default SummerySection;
