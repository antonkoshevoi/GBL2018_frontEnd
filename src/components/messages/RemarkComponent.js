import React, { Component } from 'react';
import PropTypes from 'prop-types';
import remark from "remark";
import reactRenderer from "remark-react"

class RemarkComponent extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;

    return (
      <div>
        {remark().use(reactRenderer).processSync(text).contents}
      </div>
    );
  }
}

export default RemarkComponent;