'use babel'

import {React} from 'react-for-atom'

export default (props) => {
    // TODO: pick port from package config

    return (
        <iframe
            style={{width: '100%', height: '100%', border: 'none', background: 'white'}}
            src="http://localhost:3000/webpack-dev-server/index.html"
        />
    )
}
