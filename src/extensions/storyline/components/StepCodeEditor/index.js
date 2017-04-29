/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';
import StepFormEditor from '../StepFormEditor';
import StepFormRenderer from '../StepFormRenderer';

class StepCodeEditor extends Component {

    componentWillUnmount() {
        console.log('TextStepCodeEditorEditor >', 'componentWillUnmount'); // eslint-disable-line no-console
    }

    shouldComponentUpdate() {
        console.log('StepCodeEditor >', 'shouldComponentUpdate'); // eslint-disable-line no-console
        return false;
    }

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper relative>
                <StepFormEditor />
                <StepFormRenderer />
            </Wrapper>
        );
    }
}

export default StepCodeEditor;
