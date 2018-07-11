import React, {Component} from 'react';
import '../../../styles/widgets.css';
import PropTypes from 'prop-types';
import Card from "../../../components/ui/Card";
import {
  Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
  LinearProgress, Input, InputAdornment
} from '@material-ui/core';
import {translate} from "react-i18next";
import ProductCard from "../../../components/pages/store/ProductCard";


class FeaturedItems extends Component {

    _renderStore(data){
      return data.map( (item,i) => {
        return  (
          <div key={i} className="d-inline-block">
              <ProductCard data={item}/>
          </div>
        )
      });
    }
 
    render() {
        const {data, t} = this.props;
        return (
          <Card title={t('store')} isMainCard={true} isStore={true} colorBorder="green" >
              <div className="store-container">
                  <div className="store-featured">
                      <div className="store-featured-title">
                          <span>{t('courses')}</span>
                      </div>
                    { this._renderStore(data) }
                  </div>
                  <div className="store-featured">
                      <div className="store-featured-title">
                          <span>{t('bundles')}</span>
                      </div>
                    { this._renderStore(data) }
                  </div>

                  <div className="store-featured">
                      <div className="store-featured-title">
                          <span>{t('books')}</span>
                      </div>
                    { this._renderStore(data) }
                  </div>
              </div>
          </Card>
        );
    }
}

export default translate('translations')(FeaturedItems);