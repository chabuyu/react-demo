import React, { Component } from 'react'

import {
  Card
} from 'antd'

import { getMesssageEditor } from '../../requests'

import { connect } from 'react-redux'

import { changeReadMessage } from '../../actions/message'

@connect(null,{ changeReadMessage })
export default class Editor extends Component {
  constructor(props) {
    super()
    this.state = {
      id: props.match.params.id,
      data: '',
    }
  }
  componentDidMount() {
    // console.log(this.state.id)
    this.props.changeReadMessage(this.state.id)
    getMesssageEditor(this.state.id)
      .then(resq => {
        if (resq.data.code === 200) {
          this.setState({
            data: resq.data.data
          })
        } else {
          this.props.history.push('/notfound')
        }
      })
  }

  render() {
    return (
      <Card title={this.state.data.title} style={{ margin:8 }}>
        <p>{this.state.data.message}</p>
      </Card>
    )
  }
}
