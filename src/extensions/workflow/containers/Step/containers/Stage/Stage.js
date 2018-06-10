import React, { Component } from 'react';
import style from './style.module.css';

class Stage extends Component {

    // Custom name for container
    static displayName = 'Stage';

    render() {
        return (
            <div className={style.stage}>
                Stage
            </div>
        );
    }
}

export default Stage;