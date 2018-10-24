import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {randColorName} from '../../helpers/colors';


class Insctruction extends Component {
    
    _renderInstructionList(data) {
        const _self = this;
        return data.map(function (item,i) {
            return (
                <div key={i}>
                    <div  className="m-timeline-2__item m--margin-bottom-30">
                        <div className="m-timeline-2__item-cricle">
                            <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
                        </div>
                        <div className="m-timeline-2__item-text  m--padding-top-5">
                             {item.title}
                        </div>
                    </div>
                    {
                        item.subList !== undefined &&
                        <div className="row m--padding-left-65">
                            <div className="col-xs-12">
                                <div className="m-timeline-2 my-timeline">
                                    <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
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
               <div key={i} className="m-timeline-2__item m--margin-bottom-10">
                   <div className="m-timeline-2__item-cricle">
                       <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
                   </div>
                   <div className="m-timeline-2__item-text  m--padding-top-5">
                       {item.title}
                   </div>
               </div>
           )
        })
    }
    
    render() {
        return (
            <div className="m-portlet m-portlet--creative m-portlet--first m-portlet--bordered-semi">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
                            <h2 className="m-portlet__head-label m-portlet__head-label--info">
                                    <span style={{fontSize: "2rem"}}>?</span>
                            </h2>
                        </div>
                    </div>

                </div>
                <div className="m-portlet__body">

                    <div className="m-timeline-2 my-timeline">
                        <div className="m-timeline-2__items  m--padding-top-5 m--padding-bottom-10">
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
