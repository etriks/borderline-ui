/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component } from 'react';
import BorderlineScene from '../BorderlineScene';

// Container delcaration
@borderline.stateAware('inspector')
export default class ExtensionsInjector extends Component {

    // Custom name for container
    static displayName = 'ExtensionAnchors';

    componentWillMount() {
        this.inspectorOK = false;
    }

    componentWillUpdate(next) {
        let {inspector} = next;
        this.inspectorOK = true;
        this.extensions = inspector && inspector.list != undefined ? inspector.list : {};
    }

    shouldComponentUpdate(next) {
        let {inspector} = next;
        return !!(inspector && inspector.ok != undefined && !this.inspectorOK);
    }

    render() {
        if (!this.inspectorOK)
            return null;
        console.debug(`@--># ${this.constructor.name} > render`, this.extensions); // eslint-disable-line no-console
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper>
                {Object.keys(this.extensions).map(id => (
                    <BorderlineScene model={id} seed={this.extensions[id].seed} key={`_ext__${id}`}/>
                ))}
            </Wrapper>
        );
    }
}
