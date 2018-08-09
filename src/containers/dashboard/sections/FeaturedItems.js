import React, {Component} from 'react';
import '../../../styles/widgets.css';
import Card from "../../../components/ui/Card";
import {translate} from "react-i18next";
import ProductCard from "../../../components/pages/store/ProductCard";

class FeaturedItems extends Component {

    _renderStore(items) {
        return items.map((item, i) => {                         
              return  (
                <div key={i} className="d-inline-block">
                    <ProductCard data={item}/>
                </div>
              );
        });
    }
 
    render() {
        const {data, t} = this.props;
        
        let courses = data.filter(item => Number(item.get('category').get('id')) === 1);
        let bundles = data.filter(item => Number(item.get('category').get('id')) === 2);
        let books   = data.filter(item => Number(item.get('category').get('id')) === 4);        
        
        return (
            <Card title={t('store')} isMainCard={true} isStore={true} colorBorder="green" >
                <div className="store-container">                
                {(courses.size > 0) && 
                    <div className="store-featured">
                        <div className="store-featured-title">
                            <span>{t('courses')}</span>
                        </div>
                        { this._renderStore(courses) }
                    </div>
                }
                {(bundles.size > 0) && 
                    <div className="store-featured">
                        <div className="store-featured-title">
                            <span>{t('bundles')}</span>
                        </div>
                        { this._renderStore(bundles) }
                    </div>
                }
                {(books.size > 0) && 
                    <div className="store-featured">
                        <div className="store-featured-title">
                            <span>{t('books')}</span>
                        </div>
                        { this._renderStore(books) }
                    </div>
                }
                </div>                
            </Card>
        );
    }
}

export default translate('translations')(FeaturedItems);