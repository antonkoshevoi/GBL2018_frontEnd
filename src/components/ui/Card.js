import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from "material-ui";

class Card extends Component {



    render() {
        return (
            <div style={{marginBottom:0,height:'100%',display: "flex", flexDirection: "column"}}
                 className={"m-portlet  m-portlet--head-solid-bg m-portlet--" + this.props.colorName + (this.props.transparent ? ' transparent' : '')}
            >
                <div className={`m-portlet__head  ${!this.props.header ? 'm--hide' : ''}`}>
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
						<span className="m-portlet__head-icon">
                            {this.props.avatar ?
                            <Avatar src={this.props.avatar}/> :
							<i className={this.props.icon}></i> }
						</span>
                            <h3 className="m-portlet__head-text">
                                {this.props.title}
                            </h3>
                        </div>
                    </div>

                </div>
                <div className="m-portlet__body position-relative" style={{height:"100%"}}>
                    {this.props.children}

                </div>
            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    colorName: PropTypes.string
};

Card.defaultProps = {
    colorName:'brand',
    header:true,
    transparent:false
};

export default Card;
