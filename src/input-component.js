import React from 'react'

export default class Test extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = { value: '' }
  }

  handleChange(e) {
      this.setState({ value: e.target.value })
  }

  render() {
    return (
        <div>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
    )
  }
}
