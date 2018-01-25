import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, Typography} from "material-ui";
import {NavLink} from "react-router-dom";
import StarRating from "../../ui/StarRating";
import "../../../styles/store.css"

class ProductCard extends Component {

    _renderCard(type,product) {
        return (
            <div className={`cardItem ${type=='vertical' ? ' verticalCardItem' : ' horizontalCardItem'}`}>
                <Card >
                    <NavLink to={`/store/details/${product.id}`} className="cardImage">
                        <img src={product.image} className="full-width" alt="book"/>
                    </NavLink>
                    <CardContent className="cardContent">
                            <Typography className="cardTitle" type="headline" component="h2">
                                <NavLink to={`/store/details/${product.id}`}>
                                    {product.title}
                                </NavLink>
                            </Typography>
                            <Typography className="cardDesc" component="p">
                                {product.type}
                            </Typography>
                        {type === 'horizontal' &&
                            <Typography className="cardDesc m--margin-top-5" component="p">
                                {(product.desc.length > 77) ? product.desc.substring(0,77) + '...' : product.desc}
                            </Typography>
                        }
                        <div className="cardActions m--margin-top-15">
                            <NavLink to={`/store/details/${product.id}`}>
                                <StarRating score={product.score}/>
                            </NavLink>
                            <div className="productPrice"><span className="discount"><span>150$</span></span><br/>{product.price + ' $'}</div>
                        </div>
                    </CardContent>

                </Card>
            </div>
        )
    }

    render() {
        const {type,data} = this.props;
        return (
             this._renderCard(type,data)
        );
    }
}


ProductCard.propTypes = {
    data:PropTypes.object.isRequired,
    type:PropTypes.string
};

ProductCard.defaultProps = {
    type:'vertical'
}

export default ProductCard;
