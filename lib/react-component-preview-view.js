'use babel'

import React, {ReactDOM} from 'react-for-atom'
import Preview from './component.js'

export default class ReactComponentPreviewView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.getTitle = function () { return 'Preview' };
        this.render()
    }

    render() {
        ReactDOM.render(
            <div className="react-component-preview">
                The ReactComponentPreview package is Alive! It\'s ALIVE!
                <Preview />
            </div>
        , this.element)
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
