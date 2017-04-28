/* global borderline:true */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormView from './FormViewComponent.js';
import FormSchemaView from './FormSchemaViewComponent.js';
import FormUiView from './FormUiViewComponent.js';
import * as form_t from './FormTypes';

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = form_t.default_schema;
    }

    componentDidMount() {
        this.props.dispatch({ type : form_t.FORM_ACTION_LOAD });
    }

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper absolute>
                <FormView { ...this.props } />
                <FormSchemaView formSchema={this.props.formSchema} formSchemaError={this.props.formSchemaError} />
                <FormUiView formUi={this.props.formUi} formUiError={this.props.formUiError} />
            </Wrapper>
        );
    }
}

FormComponent.propTypes = {
    formSchema: PropTypes.string.isRequired,
    formSchemaError: PropTypes.string,
    formUi: PropTypes.string,
    formData: PropTypes.string
};

const mapStateToProps = function (state) {
    return {
        formSchema: state.formSchema,
        formSchemaError: state.formSchemaError,
        formUi: state.formUi,
        formUiError: state.formUiError,
        formData: state.formData
    };
};

let FormExtension = connect(mapStateToProps)(FormComponent);

export default FormExtension;
