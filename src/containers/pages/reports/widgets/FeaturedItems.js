import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import PropTypes from 'prop-types';
import Card from "../../../../components/ui/Card";
import {
  Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
  LinearProgress, Input, InputAdornment
} from 'material-ui';
import ProductCard from "../../../../components/pages/store/ProductCard";


export default class FeaturedItems extends Component {

    _renderStore(data){
      console.log(data);
      return data.map( (item,i) => {
        return  (
          <div key={i} className="d-inline-block">
              <ProductCard data={item}/>
          </div>
        )
      });
    }
 
    render() {
        const {data} = this.props;
        return (
              <Card title="Store" colorBorder="green" >
                  <div className="store-container">
                      <div className="store-featured">
                          <div className="store-featured-title">
                              <span>Courses</span>
                          </div>
                        { this._renderStore(data) }
                      </div>
                      <div className="store-featured">
                          <div className="store-featured-title">
                              <span>Bundles</span>
                          </div>
                        { this._renderStore(data) }
                      </div>

                      <div className="store-featured">
                          <div className="store-featured-title">
                              <span>Books</span>
                          </div>
                        { this._renderStore(data) }
                      </div>
                  </div>

              </Card>

        );
    }
}
