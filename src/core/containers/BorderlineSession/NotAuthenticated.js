/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import { Children, Component } from 'react';

// Container delcaration
@borderline.stateAware('session')
export default class NotAuthenticated extends Component {

    // Custom name for container
    static displayName = 'NotAuthenticated';

    componentWillUpdate(next) {
        let {session} = next;
        this.sessionOK = session && session.ok != undefined ? session.ok : false;
    }

    shouldComponentUpdate(next) {
        let {session} = next;
        return !!(session && session.ok != undefined && this.sessionOK != session.ok);
    }

    render() {
        let {children} = this.props;
        if (this.sessionOK)
            return null;
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        return children ? Children.only(children) : null;
    }
}
