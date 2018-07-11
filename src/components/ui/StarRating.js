import React, {Component} from 'react';
import "../../styles/starRating.css"

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
