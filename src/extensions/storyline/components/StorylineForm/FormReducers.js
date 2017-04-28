/**
 */
import * as form_t from './FormTypes.js';

export default function FormReducers(state = form_t.default_schema, action) {
    var mergeState = Object.assign({}, state, action.schema);
    switch (action.type) {
        case form_t.FORM_ACTION_LOADED:
            console.log(action);
            return Object.assign({}, action.schema);
        case form_t.FORM_ACTION_SAVED:
            console.log(action);
            return Object.assign({}, action.schema);
        case form_t.FORM_ACTION_SCHEMA_UPDATE:
            mergeState.formSchemaError = "";
            return mergeState;
        case form_t.FORM_ACTION_SCHEMA_ERROR:
            return mergeState;
        case form_t.FORM_ACTION_UI_UPDATE:
            mergeState.formUiError = "";
            return mergeState;
        case form_t.FORM_ACTION_UI_ERROR:
            return mergeState;
        default:
            return state;
    }
}