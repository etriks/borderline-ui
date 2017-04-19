/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import navigationStyles from './styles/Navigation.css';

class StorylineNavigation extends Component {

    render() {
        const { pathname = '' } = this.props;
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper absolute>
                <NavLink to={`${pathname}/new`} activeClassName={navigationStyles.active} className={navigationStyles.button}>
                    New +
                </NavLink>
                <NavLink to={`${pathname}/results`} activeClassName={navigationStyles.active} className={navigationStyles.button}>
                    Results
                </NavLink>
                <NavLink to={`${pathname}/results`} activeClassName={navigationStyles.active} className={navigationStyles.button}>
                    Bookmarks
                </NavLink>
            </Wrapper>
        );
    }
}

export default StorylineNavigation;
