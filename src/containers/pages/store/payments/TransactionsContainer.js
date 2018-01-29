import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';

class TransactionsContainer extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("TransactionsContainer")(connect(
    mapStateToProps,
)(TransactionsContainer));

