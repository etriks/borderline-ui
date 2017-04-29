/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import storylineEpics from './flux/epics';
import storylineReducers from './flux/reducers';

class StorylineExtension {

    __identity__() {
        return 'storyline';
    }

    invocation() {
        this.declareEpics(storylineEpics);
        this.declareReducers(storylineReducers);
    }
}

export default StorylineExtension;
