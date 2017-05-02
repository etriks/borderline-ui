/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component, Children } from 'react';
import { default as T } from 'prop-types';
import ExtensionsInjector from './ExtensionsInjector';
import BorderlineScene from '../BorderlineScene';
import inspectorFlux from './flux';

// Container delcaration
export default class InspectorManager extends Component {

    // Custom name for container
    static displayName = 'InspectorManager';

    // Typechecking for container's props
    static propTypes = {
        children: T.element
    };

    shouldComponentUpdate() {
        return false;
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        const { children } = this.props;
        const Wrapper = borderline.components.wrapper;
        return (
            <BorderlineScene scene={'core'} seed={inspectorFlux}>
                <Wrapper absolute>
                    <ExtensionsInjector />
                    {children ? Children.only(children) : null}
                </Wrapper>
            </BorderlineScene>
        );
    }
}
