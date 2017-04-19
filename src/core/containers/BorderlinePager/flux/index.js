/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import pageReducers from './reducers';

class PageExtension {

    __identity__() {
        return 'page';
    }

    invocation() {
        this.declareReducers(pageReducers);
    }
}

export default PageExtension;
