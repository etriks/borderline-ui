/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component, PureComponent } from 'react';
import { default as T } from 'prop-types';
import { NavLink } from 'react-router-dom';

import pageActions from './flux/actions';
import navigationStyles from './styles/Navigation.css';
import logoutIcon from './images/logoutIcon.svg';
import searchIcon from './images/searchIcon.svg';
import menuTitleIcon from './images/menuTitleIcon.svg';
import menuIcon from './images/menuIcon.svg';

// Container delcaration
@borderline.stateAware('page')
export default class Navigation extends Component {

    // Custom name for container
    static displayName = 'Navigation';

    componentWillMount() {
        this.pages = [];
        this.expanded = false;
    }

    componentWillUpdate(next) {
        let {page} = next;
        this.pages = page && page.pages != undefined ? page.pages : [];
        this.expanded = page && page.expand != undefined ? page.expand : false;
    }

    shouldComponentUpdate(next) {
        console.debug(`@--># ${this.constructor.name} > shouldComponentUpdate`); // eslint-disable-line no-console
        let {page} = next;
        return !!(page && ((page.pages != undefined && page.pages.length != this.pages.length) || (page.expand != undefined && page.expand != this.expanded)));
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        return (
            <div className={`${navigationStyles.bar} ${this.expanded ? navigationStyles.expand : ''}`}>
                <ExpandMenuButtonContainer expanded={this.expanded} />
                <MainSearchBoxContainer />
                <MainMenuContainer pages={this.pages} />
                <LogoutButtonContainer />
            </div>
        );
    }
}

class ExpandMenuButtonContainer extends Component {

    // Types for available context
    static contextTypes = {
        dispatch: T.func
    };

    expand(e) {
        e.preventDefault();
        this.context.dispatch(pageActions.pageMenuToggle());
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        const { expanded } = this.props;
        const Icon = borderline.components.svg;
        return (
            <div className={navigationStyles.button} onClick={::this.expand}>
                <div className={navigationStyles.link}>
                    <div className={navigationStyles.icon}>
                        {expanded ? <Icon src={menuIcon} /> : <Icon src={menuTitleIcon} />}
                    </div>
                </div>
            </div>
        );
    }
}

@borderline.locationAware()
class MainMenuContainer extends Component {

    render() {
        const { pages } = this.props;
        const Wrapper = borderline.components.wrapper;
        const Icon = borderline.components.svg;
        console.debug(`@--># ${this.constructor.name} > render`, pages); // eslint-disable-line no-console
        return (
            <Wrapper relative>
                {pages.map((component) => (
                    <NavLink to={`/${component.particule}`} activeClassName={navigationStyles.active} className={navigationStyles.button} key={`${component.particule}_${(Math.random() * 1e32).toString(36)}}`}>
                        <div className={navigationStyles.link}>
                            <div className={navigationStyles.icon}>
                                <Icon src={component.icon} />
                            </div>
                            <div className={navigationStyles.title}>{component.name}</div>
                        </div>
                    </NavLink>
                ))}
            </Wrapper>
        );
    }
}

class MainSearchBoxContainer extends PureComponent {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        const Icon = borderline.components.svg;
        return (
            <div className={navigationStyles.button}>
                <div className={navigationStyles.link}>
                    <div className={navigationStyles.icon}>
                        <Icon src={searchIcon} />
                    </div>
                    <div className={navigationStyles.title}>Search</div>
                </div>
            </div>
        );
    }
}

class LogoutButtonContainer extends PureComponent {

    // Types for available context
    static contextTypes = {
        dispatch: T.func,
    };

    logout(e) {
        e.preventDefault();
        this.context.dispatch({type: '@@core/session/SESSION_LOGOUT'});
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        console.debug(`@--># ${this.constructor.name} > render`); // eslint-disable-line no-console
        const Icon = borderline.components.svg;
        return (
            <div className={`${navigationStyles.button} ${navigationStyles.logout}`} onClick={::this.logout}>
                <div className={navigationStyles.link}>
                    <div className={navigationStyles.icon}>
                        <Icon src={logoutIcon} />
                    </div>
                    <div className={navigationStyles.title}>Logout</div>
                </div>
            </div>
        );
    }
}
