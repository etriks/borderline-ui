/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import Immutable, { Map } from 'immutable';
import storyTypes from './types';

export default {
    storyReducer:
    (state = Map([]), action) => {

        switch (action.type) {
            case storyTypes.STEP_FORM_SCHEMA_UPDATE:
                return stepFormSchemaUpdate(state, action);
            default:
                return state;
        }
    }
};

const stepFormSchemaUpdate = (state, action) => {

    let future = state.toJS();
    future.stepFormSchema = action.text || '';
    return Immutable.fromJS(future);
};
