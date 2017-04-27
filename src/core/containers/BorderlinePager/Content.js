/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component } from 'react';
import { default as T } from 'prop-types';
import { Route } from 'react-router-dom';

import BorderlineScene from '../BorderlineScene';
import contentBoxStyles from './styles/Content.css';

// Container delcaration
@borderline.stateAware()
export default class Content extends Component {

    // Custom name for container
    static displayName = 'Content';

    // Types for available context
    static contextTypes = {
        model: T.string
    };

    componentWillMount() {
        this.pages = [];
        this.contracted = true;
    }

    componentWillUpdate(next) {
        let state = next.state ? next.state[this.context.model] : null;
        this.pages = state ? state.toJS().pages || [] : [];
        this.contracted = state ? !state.toJS().expand : true;
    }

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper relative className={`${contentBoxStyles.stage} ${this.contracted ? contentBoxStyles.contract : ''}`}>
                {this.pages.map((component) => (
                    <Route path={`/${component.particule}`} exact={false} component={() => (
                        <BorderlineScene model={component.origin} position={'pager'}>
                            <component.view />
                        </BorderlineScene>
                    )} key={`${component.particule}_${(Math.random() * 1e32).toString(36)}}`} />
                ))}
            </Wrapper>
        );
    }
}
