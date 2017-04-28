import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as form_t from './FormTypes.js';

class FormSchemaViewComponent extends Component {
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
            this.props.dispatch({ type: form_t.FORM_ACTION_SCHEMA_UPDATE, schema: { formSchema: this.codeValue} });
        }
        catch (error) { // Parse failed
            this.props.dispatch({ type: form_t.FORM_ACTION_SCHEMA_ERROR, schema: { formSchema: this.codeValue, formSchemaError: error.toString() } });
        }
    }

    render() {
        return (
            <div>
                <textarea onChange={this.onChange} value={this.props.formSchema} >
                </textarea>
                <div id='formSchemaViewError' >
                    <span>{this.props.formSchemaError} </span>
                </div>
            </div>
        );
    }
}

FormSchemaViewComponent.propTypes = {
    formSchema: PropTypes.string.isRequired,
    formSchemaError: PropTypes.string
};


let FormSchemaView = connect()(FormSchemaViewComponent);
export default FormSchemaView;
