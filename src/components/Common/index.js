import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Badge,
  Dropdown
} from 'antd'

import '../../style/common.less'
import routes from '../../routes';
import {logout} from '../../actions/user'
const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;

const mapStateToProps = (state) => {
  return {
    message: state.message.dataMessage.reduce((res, item) => {
      if (item.isRead === false) {
        res += 1
      }
      return res
    }, 0),
    name:state.user.name
  }
}
@connect(mapStateToProps, {logout})
@withRouter
export default class Common extends Component {
  constructor(props) {
    super()
  }
  checkOutMenu = ({ key }) => {
    this.props.history.push(key)
  }
  componentDidMount() {

  }
  menu = (
    <Menu >
      <Menu.Item key="1">
        <Link className='icon-top' to='/admin/users'>
          <Icon type="user" />
          <span >个人中心</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link className='icon-top' to='/admin/message'>
          <Icon type="message" />
          <span >消息中心</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={(e) => this.onHandle(e)}>
        {/* <Link className='icon-top' to='/admin/logout'> */}
          <Icon type="logout" />
          <span >退出登录</span>
        {/* </Link> */}
      </Menu.Item>
    </Menu>
  )
  onHandle = (key) => {
    this.props.logout()
    // this.props.history.push('/login')
  }
  render() {
    const lineheight = this.props.location.pathname.split('/').splice(0, 3).join('/')
    return (
      <Layout>
        <Header className="header">
          <div className="logo">
          </div>
          <div className='login'>
            <span>欢迎您！</span>
            <Dropdown trigger={['click']} overlay={this.menu}>
              <Badge count={this.props.message}>
                <span style={{ paddingRight: 8}}>{this.props.name}</span>
                <Avatar icon="user" />
              </Badge>
            </Dropdown>
          </div>
        </Header>
        <Content className='content'>
          <Layout style={{ background: '#fff' }} >
            <Sider className='menu'>
              <Menu
                mode="inline"
                defaultSelectedKeys={[routes[0].path]}//css激活的位置
                onClick={this.checkOutMenu}
                style={{ height: '100%' }}
                selectedKeys={[lineheight]}
              >
                {this.props.istitle.map(curr => {
                  return (
                    <Menu.Item
                      key={curr.path}
                    >{curr.title}</Menu.Item>
                  )
                })}
              </Menu>
            </Sider>
            <Content className='main'>
              {this.props.children}<br />
            </Content>
          </Layout>
        </Content>
        <Footer className='footer'>
          Ant Design ©2018 Created by Ant UED
    </Footer>
      </Layout>
    )
  }
}
