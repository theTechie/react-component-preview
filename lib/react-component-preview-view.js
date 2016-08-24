'use babel'

import React, {ReactDOM} from 'react-for-atom'
import Preview from './preview.js'

export default class ReactComponentPreviewView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.getTitle = function () { return 'Preview' };
        this.render()
    }

    render() {
        ReactDOM.render(<Preview />, this.element)
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {
    }

    // Tear down any state and detach
    destroy() {
        ReactDOM.unmountComponentAtNode(this.element)
    }

    getElement() {
        return this.element
    }
}
