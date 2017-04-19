/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import routerReducers from './reducers';

class RouterExtension {

    __identity__() {
        return 'router';
    }

    invocation() {
        this.declareReducers(routerReducers);
    }
}

export default RouterExtension;
