import React, { Component } from 'react'
import Input from './input-component'
import TextArea from './textarea-component'

export default class App extends Component {
  render() {
    return (
        <div>
            <h1>Hello, world. </h1>
            <Input />
            <br />
            <TextArea />
        </div>
    )
  }
}
