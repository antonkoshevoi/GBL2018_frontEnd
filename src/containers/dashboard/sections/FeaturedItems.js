import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import ProductCard from "../../../components/store/ProductCard";

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
        
        let courses     = data.filter(item => Number(item.get('category').get('id')) === 1);
        let books       = data.filter(item => Number(item.get('category').get('id')) === 4);        
        let printables  = data.filter(item => Number(item.get('category').get('id')) === 7);
        
        return (
            <div>
                <div className='block-header border-b-green'>                                                      
                    <h3 className='m-portlet__head-text'>{t('store')}</h3>
                </div>
                <div className="m-portlet">
                    <div className='m-portlet__body position-relative'>
                        <div className="store-container">
                        {(books.size > 0) && 
                            <div className="store-featured">
                                <div className="store-featured-title">
                                    <span>{t('books')}</span>
                                </div>
                                { this._renderStore(books) }
                            </div>
                        }
                        {(printables.size > 0) && 
                            <div className="store-featured">
                                <div className="store-featured-title">
                                    <span>{t('printables')}</span>
                                </div>
                                { this._renderStore(printables) }
                            </div>
                        }
                        {(courses.size > 0) && 
                            <div className="store-featured">
                                <div className="store-featured-title">
                                    <span>{t('courses')}</span>
                                </div>
                                { this._renderStore(courses) }
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default withTranslation('translations')(FeaturedItems);