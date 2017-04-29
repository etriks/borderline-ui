/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StepCodeEditor from '../StepCodeEditor';

import contentStyles from './styles/Content.css';

class StorylineContent extends Component {

    componentWillUnmount() {
        console.log('StorylineContent >', 'componentWillUnmount'); // eslint-disable-line no-console
    }

    shouldComponentUpdate() {
        console.log('StorylineContent >', 'shouldComponentUpdate'); // eslint-disable-line no-console
        return false;
    }

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Route render={({match}) =>
                <Wrapper absolute className={contentStyles.contentbox}>
                    <Route path={`${match.path}/form`} exact={false} component={() => (
                        <StepCodeEditor />
                    )} />
                </Wrapper>
            }/>
        );
    }
}

export default StorylineContent;
