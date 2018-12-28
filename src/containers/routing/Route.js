import React, { Component } from 'react';
import { Route as BaseRoute } from 'react-router-dom';

import PageTitle from '../middlewares/PageTitle';

class Route extends Component {

    render () {
        const { layout: Layout, component: Component, render, ...rest } = this.props;
    
        const newRender = (props) => {
            let result = render ? render(props) : (<Component {...props}/>);

            result = Layout ? (<Layout>{result}</Layout>) : result;
      
            return <PageTitle {...rest}>{result}</PageTitle>
        };

        return <BaseRoute {...rest} render={newRender}/>;
    }
}

export default Route;