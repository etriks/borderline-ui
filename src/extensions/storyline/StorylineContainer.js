/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';
import StorylineNavigation from './components/StorylineNavigation';
import StorylineContent from './components/StorylineContent';

// import containerStyles from './styles/Container.css';

class StorylineContainer extends Component {

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper relative>
                <StorylineContent/>
                <StorylineNavigation/>
            </Wrapper>
        );
    }
}

export default StorylineContainer;
