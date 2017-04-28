import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import * as form_t from './FormTypes.js';

class FormViewComponent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);
    }

    onChange(data) {
        console.log('Change');
        console.log(data);
    }

    onSubmit(data) {
        console.log('Submit');
        console.log(data);

        var submitSchema = {
            formSchema: JSON.stringify(data.schema, null, 6),
            formData: JSON.stringify(data.formData, null, 6),
            formUi: JSON.stringify(data.uiSchema, null, 6)
        };
        this.props.dispatch({ type: form_t.FORM_ACTION_SAVE, schema: submitSchema });
    }

    onError(data) {
        console.log('Error');
        console.log(data);
    }

    render() {
        let fSchema = {};
        let fUi = {};
        let fData = {};
        try {
            fSchema = JSON.parse(this.props.formSchema);
            fUi = JSON.parse(this.props.formUi);
            fData = JSON.parse(this.props.formData);
        }
        catch (error) {
            this.onError(error);
        }

        return (
            <div>
                <Form schema={fSchema}
                      uiSchema={fUi}
                      formData={fData}
                      onChange={this.onChange}
                      onSubmit={this.onSubmit}
                      onError={this.onError}
                      showErrorList={false}>
                    <button type='submit'>Trigger save event</button>
                </Form>
                <div id='formViewError'>
                    <span>{this.props.formSchemaError} </span>
                    <span>{this.props.formUiError} </span>
                </div>
            </div>
        );
    }
}

FormViewComponent.propTypes = {
    formSchema: PropTypes.string.isRequired,
    formSchemaError: PropTypes.string,
    formUi: PropTypes.string,
    formData: PropTypes.string
};


let FormView = connect()(FormViewComponent);
export default FormView;
