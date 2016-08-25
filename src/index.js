import React from 'react'
import ReactDOM from 'react-dom'

var ComponentToRender = require(__COMPONENT_TO_RENDER)

if (ComponentToRender.default !== undefined) {
    ComponentToRender = ComponentToRender.default
}

ReactDOM.render(<ComponentToRender />, document.getElementById('root'))
