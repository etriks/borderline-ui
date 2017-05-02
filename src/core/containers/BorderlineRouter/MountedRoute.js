/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import { Component, Children } from 'react';
import { default as T } from 'prop-types';
import routerActions from './flux/actions';

// Container delcaration
export default class MountedRoute extends Component {

    // Custom name for container
    static displayName = 'MountedRoute';

    // Typechecking for container's props
    static propTypes = {
        children: T.element
    };

    // Types for available context
    static contextTypes = {
        dispatch: T.func,
        router: T.object
    };

    // Typechecking for children's context
    static childContextTypes = {
        location: T.object
    };

    getChildContext() {
        return {
            location: {
                subscribe: (id, func) => {
                    this.listeners[id] = func;
                },
                unsubscribe: (id) => {
                    delete this.listeners[id];
                }
            },
        };
    }

    componentWillMount() {
        this.listeners = [];
    }

    componentDidMount() {
        this.advertise();
    }

    componentDidUpdate() {
        this.advertise();
    }

    advertise() {
        if (this.location != this.props.destination.pathname) {
            this.location = this.props.destination.pathname;
            this.context.dispatch(routerActions.routerLocationChange(this.location));
        }
        let keys = Object.keys(this.listeners);
        for (var i = 0; i < keys.length; i++)
            this.listeners[keys[i]](this.context.router);
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        const { children } = this.props;
        return children ? Children.only(children) : null;
    }
}
