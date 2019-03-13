import React from 'react'
import {
  Spin,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
} from 'antd'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { getUserInfo } from '../../actions/user'

import './login.less'

const mapStateToProps = (state) => {
  return {
    islogin: state.user.islogin,
    haslogin: state.user.haslogin
  }
}


@connect(mapStateToProps, { getUserInfo })
@Form.create({ name: 'login' })
export default class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        this.props.getUserInfo()
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.haslogin ?
      <Redirect to='/admin' />
      :
      (
        <Spin spinning={this.props.islogin}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item className='login-bottom'>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码？</a>
              <Button type="primary" htmlType="submit"  >登录</Button>
              <a href="" style={{ marginLeft: 8 }}>注册</a>
            </Form.Item>
          </Form>
        </Spin>

      );
  }
}
