/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';

class StorylineContent extends Component {

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper absolute>
                <span></span>
            </Wrapper>
        );
    }
}

export default StorylineContent;
