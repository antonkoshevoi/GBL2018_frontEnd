import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MaskedInput} from "react-text-mask";

class MaskText extends Component {
    render() {
        return (
            <MaskedInput
                {...this.props}
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }
}


export default MaskText;
