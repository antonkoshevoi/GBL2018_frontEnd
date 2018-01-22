import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "../../styles/starRating.css"
import starImage from '../../media/images/star-rating.png'

class StarRating extends Component {
    render() {
        const {score} = this.props;
        return (
            <div className="ratings">
                <div className="empty-stars"></div>
                <div className="full-stars" style={{width:`${score * 100 / 5}%`}}></div>
            </div>
        );
    }
}


export default StarRating;
