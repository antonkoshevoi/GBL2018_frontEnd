import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from "material-ui";

class Card extends Component {



    render() {
        const {avatar, className,title,icon, children,header,colorName, transparent} = this.props
        return (
            <div style={{marginBottom:0,height:'100%',display: "flex", flexDirection: "column"}}
                 className={className + " m-portlet  m-portlet--head-solid-bg m-portlet--" + colorName + (transparent ? ' transparent' : '')}

            >
                <div className={`m-portlet__head  ${!header ? 'm--hide' : ''}`}>
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
						<span className="m-portlet__head-icon">
                            {avatar && avatar !== '' ?
                            <Avatar src={avatar}/> :
							<i className={icon}></i> }
						</span>
                            <h3 className="m-portlet__head-text">
                                {title}
                            </h3>
                        </div>
                    </div>

                </div>
                <div className="m-portlet__body position-relative" style={{height:"100%"}}>
                    {children}
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
