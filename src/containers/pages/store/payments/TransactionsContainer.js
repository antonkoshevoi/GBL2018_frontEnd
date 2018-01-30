import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import TransactionList from "../../../../components/pages/store/payment/TransactionList";
import {withRouter} from "react-router-dom";
import {getRecords} from "../../../../redux/transactions/actions";
import {selectGetRecordsRequest, selectRecords} from "../../../../redux/transactions/selectors";

class TransactionsContainer extends Component {


    componentDidMount(){
        this._getTransactions();
    }


    _getTransactions(){
        this.props.getRecords();
    }

    render() {

        const {cartRecordsRequest, records } = this.props;
        console.log(records);
        return (
            <div>
                <TransactionList request={cartRecordsRequest} data={records}/>
            </div>
        );
    }
}


TransactionsContainer = connect(
    (state) => ({
        cartRecordsRequest: selectGetRecordsRequest(state),
        records: selectRecords(state),
        auth: state.auth
    }),
    (dispatch) => ({
        getRecords: () => { dispatch(getRecords()) },
    })
)(TransactionsContainer);

export default withRouter(translate("TransactionsContainer")(TransactionsContainer));



