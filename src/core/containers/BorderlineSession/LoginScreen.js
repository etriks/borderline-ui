/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component } from 'react';
import { default as T } from 'prop-types';
import LoaderBar from '../../components/LoadBar';
import sessionActions from './flux/actions';
import loginStyles from './styles/Login.css';

// Container delcaration
@borderline.stateAware('session')
export default class LoginScreen extends Component {

    // Custom name for container
    static displayName = 'LoginScreen';

    // Types for available context
    static contextTypes = {
        dispatch: T.func
    };

    sumbit(e) {
        e.preventDefault();
        this.context.dispatch(sessionActions.sessionLogin({
            username: this.refs.username.value,
            password: this.refs.password.value
        }));
    }

    componentWillUpdate(next) {
        let {session} = next;
        this.isProcessing = session && session.working != undefined ? session.working : true;
        this.hasAttempted = session && session.attempts ? session.attempts > 0 : false;
        this.error = session && session.error ? session.error : '';
    }

    shouldComponentUpdate(next) {
        let {session} = next;
        return !!(session && (
            (session.working && this.isProcessing != session.working) ||
            (session.attempts && this.hasAttempted != session.attempts > 0) ||
            (session.error && this.error != session.error)));
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper absolute className={`${loginStyles.screen}`}>
                <div className={loginStyles.box}>
                    <div className={loginStyles.title}>
                        <span>borderline<strong>:</strong></span>
                    </div>
                    <form className={loginStyles.form} onSubmit={::this.sumbit}>
                        <input type="text" placeholder="Username" ref="username" /><br />
                        <input type="password" placeholder="Password" ref="password" /><br />
                        {this.isProcessing ? (<LoaderBar />) : (<button type="submit">Login</button>)}<br />
                        {this.hasAttempted && this.error ? (<div className={loginStyles.error}>{this.error}</div>) : ''}
                        {this.hasAttempted && this.error ? (<br />) : ''}
                        <span>I forgot my password</span>
                    </form>
                </div>
            </Wrapper>
        );
    }
}
