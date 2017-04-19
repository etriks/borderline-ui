/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import React, { Component } from 'react';
import { default as T } from 'prop-types';

class DashboardContainer extends Component {

    // Types for available context
    static contextTypes = {
        dispatch: T.func
    };

    componentDidMount() {
        this.context.dispatch({type: 'DASHBOARD_DID_MOUNT'});
    }

    render() {
        return (
            <div>Welcome to borderline</div>
        );
    }
}

export default DashboardContainer;
