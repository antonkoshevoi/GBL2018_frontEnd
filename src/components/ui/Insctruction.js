import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {randColorName} from '../../helpers/colors';

class Insctruction extends Component {
    
    _renderInstructionList(data) {
        const _self = this;
        return data.map(function (item,i) {
            return (
                <div key={i}>
                    <div  className="m-timeline-2__item mb-4">
                        <div className="m-timeline-2__item-cricle pr-2">
                            <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
                        </div>
                        <div className="m-timeline-2__item-text pl-4 py-1">
                             {item.title}
                        </div>
                    </div>
                    {
                        item.subList !== undefined &&
                        <div className="row pl-5">
                            <div className="col-xs-12">
                                <div className="m-timeline-2 my-timeline">
                                    <div className="m-timeline-2__items py-3">
                                        {_self._renderInstructionItemList(item.subList)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )
        })
    }


    _renderInstructionItemList(list) {
        return list.map(function (item,i) {
           return (
               <div key={i} className="m-timeline-2__item mb-3">
                   <div className="m-timeline-2__item-cricle pr-2">
                       <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
                   </div>
                   <div className="m-timeline-2__item-text pl-4 py-1">
                       {item.title}
                   </div>
               </div>
           )
        })
    }
    
    render() {
        return (
            <div className="m-portlet m-portlet--brand  m-portlet--head-solid-bg m-portlet--bordered">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
                            <span className="m-portlet__head-icon">
                                <i className="fa fa-question-circle-o" />
                            </span>
                            <h3 className="m-portlet__head-text">Instructions</h3>
                        </div>
                    </div>
                </div>
                <div className="m-portlet__body">

                    <div className="m-timeline-2 my-timeline">
                        <div className="m-timeline-2__items p-0 py-3">
                            {this._renderInstructionList(this.props.data)}
                    </div>
                 </div>                        
                </div>
            </div>
        );
    }
}

Insctruction.propTypes = {
    data:PropTypes.array.isRequired
};

export default Insctruction;
