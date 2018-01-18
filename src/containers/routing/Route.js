import React, { Component } from 'react';
import { Route as BaseRoute } from 'react-router-dom';

class Route extends Component {

  render () {
    const { layout: Layout, component: Component, render, ...rest } = this.props;

    const newRender = (props) => {
      const rendered = render ? render(props) : (
        <Component {...props}/>
      );

      return Layout ? (
        <Layout>
          {rendered}
        </Layout>
      ) : rendered;
    };

    return <BaseRoute {...rest} render={newRender}/>;
  }
}

export default Route;