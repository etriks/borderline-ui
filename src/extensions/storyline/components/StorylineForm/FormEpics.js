import { combineEpics, createEpicMiddleware } from 'redux-observable';
//import { Observable } from 'rxjs';
import 'rxjs';

import * as form_t from './FormTypes.js';

export function savedFormAction(schema) {
    return { type: form_t.FORM_ACTION_SAVED, schema: schema }
}

export function loadedFormAction(schema) {
    return { type: form_t.FORM_ACTION_LOADED, schema: schema }
}

export function FormSaveEpic(action) {
    return action.ofType(form_t.FORM_ACTION_SAVE).map(
        function(action) {
            //Do API call HERE
            //Branch on saveFromActionError if fail
            console.log(action);
            return savedFormAction(Object.assign({}, action.schema));
        }
    );
}

export function FormLoadEpic(action) {
    return action.ofType(form_t.FORM_ACTION_LOAD).map(
        function(action) {
            //Do API call HERE
            //Branch on loadedFromActionError if fail
            console.log(action);
            return loadedFormAction(form_t.mock_schema);
        }
    );
}

let FormEpics = createEpicMiddleware(combineEpics(FormSaveEpic, FormLoadEpic));
export default FormEpics