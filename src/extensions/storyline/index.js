/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import storylineEpics from './epics';

class StorylineExtension {

    __identity__() {
        return 'storyline';
    }

    invocation() {
        this.declareEpics(storylineEpics);
    }
}

export default StorylineExtension;
