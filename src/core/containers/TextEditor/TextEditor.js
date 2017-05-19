/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component } from 'react';

import editorLoader from '../../utilities/EditorLoader';

class TextEditor extends Component {

    componentWillMount() {
        this.setState({
            value: ''
        });
    }

    componentDidMount() {
        this.disposed = false;
        this.options = this.props.options;
        this.setState({
            value: this.props.value || ''
        });
        editorLoader.getPromise().then(() => {
            if (this.disposed)
                return;
            this.init();
        });
    }

    componentWillUpdate() {
        if (this.editor)
            this.setState({
                value: this.editor.getValue()
            });
    }

    componentDidUpdate() {
        if (this.editor)
            this.editor.setValue(this.props.value);
    }

    componentWillUnmount() {
        console.log('TextEditor >', 'componentWillUnmount', this.disposed); // eslint-disable-line no-console
        if (this.editor)
            this.editor.dispose();
        this.disposed = true;
    }

    shouldComponentUpdate() {
        console.log('TextEditor >', 'shouldComponentUpdate'); // eslint-disable-line no-console
        return false;
    }

    init() {
        this.editor = window.monaco.editor.create(this.slot, {
            value: this.state.value,
            language: this.options.language,
            theme: 'vs-dark',
            contextmenu: false,
            quickSuggestions: false,
            automaticLayout: true,
            fontSize: 12,
            scrollbar: {
                useShadows: false,
                verticalHasArrows: true,
                horizontalHasArrows: true,
                vertical: 'visible',
                horizontal: 'visible',
                verticalScrollbarSize: 17,
                horizontalScrollbarSize: 17,
                arrowSize: 30
            }
        });
        if (this.options.onLoad)
            this.options.onLoad(this.editor);
        // this.editor.onDidChangeModelContent(() => {
        //     (this.options.onDidChangeModelContent || (() => {}))(this.editor);
        // });
    }

    render() {
        return (
            <div className={borderline.styles.relativeExpand} ref={(slot) => { this.slot = slot; }} />
        );
    }
}

export default TextEditor;
