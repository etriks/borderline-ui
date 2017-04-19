/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import storeEpics from './epics';

class StoreExtension {

    __identity__() {
        return 'store';
    }

    invocation() {
        this.declareEpics(storeEpics);
    }
}

export default StoreExtension;
