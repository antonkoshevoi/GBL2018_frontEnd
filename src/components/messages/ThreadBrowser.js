import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from "immutable";
import { translate } from 'react-i18next';
import Thread from './Thread';
import {Scrollbars} from "react-custom-scrollbars";

class ThreadBrowser extends Component {
    static propTypes = {
        threads: PropTypes.instanceOf(Immutable.Map).isRequired,
        onSelectThread: PropTypes.func.isRequired,
    };

    _renderThreads() {
        const {threads, onSelectThread } = this.props;
        let views = [];

        threads.forEach((thread, key) => {
            views.push(
                <div key={key} onClick={() => { onSelectThread(thread.get('id')) }} >
                    <Thread thread={thread} />
                </div>
            );
        });

        return views;
    }

    render() {
        const {t} = this.props;
        return (
            <div className="m-widget1 m-widget1--paddingless">
                <span className="m-list-search__result-category">
                    {t('conversations')}
                </span>
                <Scrollbars autoHeight={true}>
                    { this._renderThreads() }
                </Scrollbars>
            </div>
        );
    }
}

export default translate('translations')(ThreadBrowser);