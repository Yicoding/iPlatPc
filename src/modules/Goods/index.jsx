import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [1, 2, 3]
    }
  }
  _renderBook = () => {
    let { books } = this.state
    return books.map((item, index) => {
      return (
        <li key={index}>{index}</li>
      )
    })
  }
  add = () => {
    let { books } = this.state
    books.push(4)
    this.setState({ books })
  }
  render() {
    return (
      <div>
        <ul>
          {this._renderBook()}
          <button onClick={this.add}>add</button>
        </ul>
      </div>
    )
  }
}