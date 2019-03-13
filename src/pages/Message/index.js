import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  List,
  Avatar,
  Badge,
  Button
} from 'antd'
import './message.less'
import { connect } from 'react-redux'
import { changeAllMessage } from '../../actions/message'
const mapStateToProps = (state) => {
  return {
    dataMessage: state.message.dataMessage
  }
}
@connect(mapStateToProps,{ changeAllMessage })
export default class Message extends Component {

  overMessageChange = () => {
    this.props.changeAllMessage()
  }
  render() {
    // console.log(this.props)
    return (
      <Card
        title='消息中心'
        >
        <Button type='primary' style={{ float:"right" }} onClick={this.overMessageChange} className='overMessageChange'>全部已读</Button>
        <List
          itemLayout="horizontal"
          dataSource={this.props.dataMessage}
          renderItem={item => (
            <List.Item>
              <Link to={`/admin/message/editor/${item.id}`}>
              <List.Item.Meta
                avatar={<Badge dot={item.isRead === false}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>}
                title={<span>{item.title}</span>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              </Link>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}
