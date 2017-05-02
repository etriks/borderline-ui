/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import React, { Component } from 'react';
import { default as T } from 'prop-types';
import { withRouter } from 'react-router-dom';

export function locationHOC() {
    return function wrapWithLocation(WrappedComponent) {
        return class LocationAware extends Component {

            // Types for available context
            static contextTypes = {
                location: T.object,
                router: T.object
            };

            // Types for child context
            static childContextTypes = {
                router: T.object
            };

            getChildContext() {
                return {
                    router: this.router || this.context.router
                };
            }

            componentWillMount() {
                this.uniq = (Math.random() * 1e32).toString(36);
                this.context.location.subscribe(this.uniq, (router) => {
                    this.router = router;
                    this.forceUpdate();
                });
            }

            componentWillUpdate() {
                console.debug(`&--># ${this.constructor.name}/${WrappedComponent.displayName || WrappedComponent.name} > componentWillUpdate`, this.context); // eslint-disable-line no-console
            }

            componentWillUnmount() {
                this.context.location.unsubscribe(this.uniq);
            }

            render() {
                const HOC = withRouter(WrappedComponent);
                console.debug(`&--># ${this.constructor.name}/${WrappedComponent.displayName || WrappedComponent.name} > render`, this.props); // eslint-disable-line no-console
                return <HOC {...this.props} />;
            }
        };
    };
}

export const locationAware = () => {
    return (target) => {
        return locationHOC()(target);
    };
};
