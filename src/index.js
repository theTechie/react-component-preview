import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

var ComponentToRender = require(__COMPONENT_TO_RENDER)

if (ComponentToRender.default !== undefined) {
	ComponentToRender = ComponentToRender.default
}

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	)
}

render(ComponentToRender)

if (module.hot) {
	module.hot.accept()
}
