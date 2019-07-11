import React from 'react';
import ProductCard from "./ProductCard";

const Sidebar = (props) => {  
    const {title, data} = props;
    
    if (data.size === 0) {
        return '';
    }
    
    return (
        <div className="mb-5">
            {title && <h3 className="sidebarTitle px-1">{title}</h3>}
            <div>
            {data.map(function (item, i) {
                return <ProductCard key={i} data={item} type="horizontal"/>
            })}
            </div>
        </div>
    );    
}

export default Sidebar;
