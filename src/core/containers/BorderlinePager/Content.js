/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import BorderlineScene from '../BorderlineScene';
import contentBoxStyles from './styles/Content.css';

// Container delcaration
@borderline.stateAware('page')
export default class Content extends Component {

    // Custom name for container
    static displayName = 'Content';

    componentWillMount() {
        this.pages = [];
        this.contracted = true;
    }

    componentWillUpdate(next) {
        let { page } = next;
        this.pages = page && page.pages != undefined ? page.pages : [];
        this.contracted = page && page.expand != undefined ? !page.expand : true;
    }

    shouldComponentUpdate(next) {
        console.debug(`@--># ${this.constructor.name} > shouldComponentUpdate`); // eslint-disable-line no-console
        let { page } = next;
        return !!(page && ((page.pages != undefined && page.pages.length != this.pages.length) || (page.expand != undefined && page.expand == this.contracted)));
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper relative className={`${contentBoxStyles.stage} ${this.contracted ? contentBoxStyles.contract : ''}`}>
                <ContentContainer pages={this.pages} />
            </Wrapper>
        );
    }
}

@borderline.locationAware()
class ContentContainer extends Component {

    componentWillUnmount() {
        console.debug(`@--># ${this.constructor.name} > componentWillUnmount`); // eslint-disable-line no-console
    }

    shouldComponentUpdate() {
        console.debug(`@--># ${this.constructor.name} > shouldComponentUpdate`); // eslint-disable-line no-console
    }

    render() {
        const { pages } = this.props;
        const Wrapper = borderline.components.wrapper;
        console.debug(`@--># ${this.constructor.name} > render`, pages); // eslint-disable-line no-console
        return (
            <Wrapper relative>
                {pages.map((component) => (
                    <Route path={`/${component.particule}`} exact={false} component={() => (
                        <BorderlineScene model={component.origin}>
                            <component.view />
                        </BorderlineScene>
                    )} key={`${component.particule}_${(Math.random() * 1e32).toString(36)}}`} />
                ))}
            </Wrapper>
        );
    }
}
