import React from 'react';
import "../../styles/starRating.css"

const StarRating = (props) => {
    return (
        <div className="ratings">
            <div className="empty-stars"></div>
            <div className="full-stars" style={{width:`${props.score * 100 / 5}%`}}></div>
        </div>
    );    
}

export default StarRating;