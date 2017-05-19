/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';
import { default as T } from 'prop-types';
import storyTypes from '../../flux/types';

import stepStyles from './styles/Editor.css';

@borderline.stateAware('storyline')
class StepFormEditor extends Component {

    // Custom name for container
    static displayName = 'StepFormEditor';

    // Types for available context
    static contextTypes = {
        dispatch: T.func
    };

    onDidChangeModelContent(editor) {
        try {
            let form = JSON.parse(editor.getValue());
            this.context.dispatch({type: storyTypes.STEP_FORM_SCHEMA_UPDATE, text: form});
        } catch (e) {
            console.error('StepFormEditor >', 'onDidChangeModelContent'); // eslint-disable-line no-console
        }
    }

    onLoad(editor) {
        console.error('StepFormEditor >', 'onLoad', editor); // eslint-disable-line no-console
        editor.onDidChangeModelContent(() => {
            this.onDidChangeModelContent(editor);
        });
    }

    shouldComponentUpdate(next) {
        console.log('StepFormEditor >', 'shouldComponentUpdate', next); // eslint-disable-line no-console
        let {storyline} = next;
        return !!(storyline);
    }

    render() {
        const Wrapper = borderline.components.wrapper;
        const Editor = borderline.components.textEditor;
        return (
            <Wrapper absolute className={stepStyles.editor}>
                <Editor options={{
                    language: 'json',
                    onLoad: ::this.onLoad
                }} />
            </Wrapper>
        );
    }
}

export default StepFormEditor;
