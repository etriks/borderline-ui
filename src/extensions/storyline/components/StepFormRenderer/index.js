/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';
import { default as T } from 'prop-types';
import Form from 'react-jsonschema-form';

import stepStyles from './styles/Renderer.css';

@borderline.stateAware('storyline')
class StepFormRenderer extends Component {

    // Custom name for container
    static displayName = 'StepFormRenderer';

    // Typechecking for container's props
    static propTypes = {
        formSchema: T.string,
        formSchemaError: T.string,
        formUi: T.string,
        formData: T.string
    };

    // Types for available context
    static contextTypes = {
        dispatch: T.func
    };


    constructor(props) {
        super(props);
        this.onChange = ::this.onChange;
        this.onSubmit = ::this.onSubmit;
        this.onError = ::this.onError;
    }

    onChange(data) {
        console.log('Change'); // eslint-disable-line no-console
        console.log(data); // eslint-disable-line no-console
    }

    onSubmit(data) {
        console.log('Submit'); // eslint-disable-line no-console
        console.log(data); // eslint-disable-line no-console

        var submitSchema = {
            formSchema: data.schema,
            formData: JSON.stringify(data.formData, null, 6),
            formUi: JSON.stringify(data.uiSchema, null, 6)
        };
        this.context.dispatch({ type: 'FORM_ACTION_SAVE', schema: submitSchema });
    }

    onError() {
        console.log('Error'); // eslint-disable-line no-console
        // console.log(data); // eslint-disable-line no-console
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    render() {
        const Wrapper = borderline.components.wrapper;
        let fSchema = {};
        let fUi = {};
        let fData = {};
        try {
            // fSchema = JSON.parse(this.props.state[this.context.model].toJS().stepFormSchema);
            if (this.props.storyline && this.props.storyline.stepFormSchema)
                fSchema = this.props.storyline.stepFormSchema;
            // fUi = JSON.parse(this.props.formUi);
            // fData = JSON.parse(this.props.formData);
        }
        catch (error) {
            this.onError(error);
        }
        return (
            <Wrapper absolute className={stepStyles.renderer}>
                <Form schema={fSchema}
                    uiSchema={fUi}
                    formData={fData}
                    onChange={this.onChange}
                    onError={this.onError}
                    showErrorList={false}>
                </Form>
                <div id='formViewError'>
                    <span>{this.props.formSchemaError} </span>
                    <span>{this.props.formUiError} </span>
                </div>
            </Wrapper>
        );
    }
}

export default StepFormRenderer;
