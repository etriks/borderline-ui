/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline:true */

import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import navigationStyles from './styles/Navigation.css';

class StorylineNavigation extends Component {

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Route render={({match}) =>
                <Wrapper absolute className={navigationStyles.navbar}>
                    <NavLink to={`${match.path}/new`} activeClassName={navigationStyles.active} className={`${navigationStyles.button} ${navigationStyles.highlight}`}>
                        New +
                    </NavLink>
                    <NavLink to={`${match.path}/results`} activeClassName={navigationStyles.active} className={navigationStyles.button}>
                        Results
                    </NavLink>
                    <NavLink to={`${match.path}/bookmarks`} activeClassName={navigationStyles.active} className={navigationStyles.button}>
                        Bookmarks
                    </NavLink>
                </Wrapper>
            }/>
        );
    }
}

export default StorylineNavigation;
