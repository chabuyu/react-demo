import React, { createRef } from 'react'
import moment from 'moment'
import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Typography
} from 'antd';


import './edit.less'
// 导入富文本编辑器
import E from 'wangeditor'

import { getArticleEdit, getArticleDel } from '../../requests'
const { Text } = Typography

// 页面布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
@Form.create({
  name: "editList"
})

export default class NormalLoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      age: '',
      position: '',
      dateTime: '',
      person: '',
    }
    this.editorRef = createRef()
  }
  componentDidMount() {
    const id = this.props.match.params.id
    getArticleEdit(id).then(
      res => {
        if (res.data.code === 200) {
          const {
            name,
            age,
            position,
            dateTime,
            person
          } = res.data.data
          this.setState({
            name,
            age,
            position,
            dateTime,
            person
          }, () => {
            this.editor.txt.html(this.state.person)
          })
        }
      }
    )
      .catch(err => {
        console.log(err)
      })
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = html => {
      this.setState({
        person: html
      })
    }
    this.editor.create()

  }
  editSuccess = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          dateTime,
        } = values
        values.dateTime = moment(dateTime).valueOf()
        getArticleDel(values)
          .then(resq => {
            this.props.history.push('/admin/personnel')
          })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        title={<h2>编辑职员 <Text type='danger'>{this.props.location.state.name}</Text> </h2>}
        style={{ margin:8 }}
      >
        <Form className="login-form">
          <Form.Item label='职员名称' {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: this.state.name,
              rules: [{
                required: true,
                message: '请输入正确的员职名字!'
              }, {
                min: 2,
                max: 8,
                message: '请输入2-8位名字'
              }],
            })(
              <Input placeholder="请输入员职名字" />
            )}
          </Form.Item>
          <Form.Item label='年龄' {...formItemLayout}>
            {getFieldDecorator('age', {
              initialValue: this.state.age,
              rules: [{
                required: true,
                message: '请输入正确的员职年龄!'
              }],
            })(
              <Input placeholder="请输入员职年龄" />
            )}
          </Form.Item>
          <Form.Item label='职员职位' {...formItemLayout}>
            {getFieldDecorator('position', {
              initialValue: this.state.position,
              rules: [{
                required: true,
                message: '请输入正确的员职职位!'
              }],
            })(
              <Input placeholder="请输入员职职位" />
            )}
          </Form.Item>
          <Form.Item label='入职时间' {...formItemLayout}>
            {getFieldDecorator('dateTime', {
              initialValue: moment(this.state.dateTime),
              rules: [{
                required: true,
                message: '请输入正确的入职时间!'
              }],
            })(
              <DatePicker
                showTime
                placeholder="Select Time"
                style={{ width: '100%' }}
              />
            )}
          </Form.Item>
          <Form.Item label='职员简介' {...formItemLayout}>
            {getFieldDecorator('person', {
              initialValue: this.state.person
            })(
              <div ref={this.editorRef}></div>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" onClick={this.editSuccess} className="login-form-button" >提交</Button>
          </Form.Item>
        </Form>
      </Card>

    );
  }
}
