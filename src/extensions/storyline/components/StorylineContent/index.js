/* global borderline:true */

import React, { Component } from 'react';
import FormExtension from '../StorylineForm/index.js';
import * as form_t from '../StorylineForm/FormTypes.js';

class StorylineContent extends Component {

    render() {
        const Wrapper = borderline.components.wrapper;
        return (
            <Wrapper absolute>
                <FormExtension { ... form_t.default_schema } />
            </Wrapper>
        );
    }
}

export default StorylineContent;
