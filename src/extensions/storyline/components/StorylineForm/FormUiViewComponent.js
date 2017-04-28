import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as form_t from './FormTypes.js';

class FormUiViewComponent extends Component {
    constructor(props) {
        super(props);
        this.codeValue = '';
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        try {
            this.codeValue = event.target.value; // Get code from input field
            JSON.parse(this.codeValue); // Try to parse it to detect errors
            // Update state schema
            this.props.dispatch({ type: form_t.FORM_ACTION_UI_UPDATE, schema: { formUi: this.codeValue} });
        }
        catch (error) { // Parse failed
            this.props.dispatch({ type: form_t.FORM_ACTION_UI_ERROR, schema: { formUi: this.codeValue, formUiError: error.toString() } });
        }
    }

    render() {
        return (
            <div>
                <textarea onChange={this.onChange} value={this.props.formUi} >
                </textarea>
                <div id='formUiViewError' >
                    {this.props.formUiError}
                </div>
            </div>
        );
    }
}

FormUiViewComponent.propTypes = {
    formUi: PropTypes.string.isRequired,
    formUiError: PropTypes.string
};


let formUiView = connect()(FormUiViewComponent);
export default formUiView;
