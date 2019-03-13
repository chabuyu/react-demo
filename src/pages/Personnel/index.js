import React, { Component, Fragment } from 'react'
import {
  Card,
  Table,
  Button,
  Popover,
  Modal,
  notification,
  Typography,
  Select
} from 'antd'


import ButtonGroup from 'antd/lib/button/button-group';

import { getArticleList, getArticleDel } from '../../requests'


const { Text } = Typography
const Option = Select.Option;
// const dataSource = Array.from(Array(96).keys()).map(curr => {
//   return {
//     id: curr,
//     name: `张三${curr + 1}`,
//     age: `32${curr}`,
//     address: `西湖区湖底公园1号${curr}`,
//     position: '清洁工'
//   }
// })
export default class Personnel extends Component {
  constructor() {
    super()
    this.inital=[{
      title: '姓名',
      dataIndex: 'name',
      id: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      id: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      id: 'address',
    }, {
      title: '职位',
      dataIndex: 'position',
      id: 'position',
    }, {
      title: '操作',
      dataIndex: 'operation',
      id: 'operation',
      render: (text, record, index) => {
        return (
          <ButtonGroup>
            <Popover content={record.name}>
              <Button
              size='small'
              type='primary'
              onClick={this.personnelEdit.bind(this,record)}
              >编辑</Button>
            </Popover>
            <Popover content={record.name}>
              <Button
                size='small'
                type='danger'
                onClick={this.onListDel.bind(this, record)}
              >辞退</Button>
            </Popover>
          </ButtonGroup>
        )
      }
    }]
    this.state = {
      dataSource: [],
      loading: true,
      visible: false,
      confirmLoading: false,
      delId: '',
      delName: '',
      columnsValue: ['年龄', '住址', '职位'],
      columns: this.inital
    }
  }
  //ajax请求
  componentDidMount() {
    this.personnelList()
  }
  // ajax 组件
  personnelList() {
    getArticleList()
      .then(resp => {
        if (resp.data.code === 200) {
          this.setState({
            dataSource: resp.data.data,
            loading: false
          })
        }
      })
  }
  //删除（列表点击事件）
  onListDel = (record) => {
    this.setState({
      visible: true,
      delId: record.id,
      delName: record.name
    })
  }
  // 点击确定按钮
  delListOK = () => {
    this.setState({
      confirmLoading: true
    }, () => {
      console.log(this.state.delId)
      const id = this.state.delId

      getArticleDel(id).then(res => {
        console.log(res.data.data)
        if (res.data.code === 200) {
          this.cancelNO()
          this.personnelList()
          notification.success({
            message: '辞退成功',
            duration: 2
          })
        } else {

        }
      })
    })
  }
  // 取消按钮
  cancelNO = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
    })
  }
  chooseList = (changeList) => {
    const columns = this.inital.filter(curr => (
      changeList.includes(curr.title) ||
      curr.title === '操作' ||
      curr.title === '姓名'
    ))
    this.setState({
      columns
    })
  }
  // 编辑按钮
  personnelEdit = (record) => {
    const {
      id,
      name
    } = record
    console.log(record)
    this.props.history.push(`/admin/personnel/edit/${id}`,{name})
  }
  render() {
    return (
        <Card title='人员管理' style={{ margin:8 }}>
          <Fragment>
            <Select
              mode="multiple"
              style={{ width: 290 }}
              onChange={this.chooseList}
              defaultValue={this.state.columnsValue}
            >
              {this.state.columnsValue.map(curr => <Option key={curr}>{curr}</Option>)}
            </Select>
          </Fragment>
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            rowKey={record => record.id}
            loading={this.state.loading}
            pagination={
              {
                defaultPageSize: 8,
                hideOnSinglePage: true,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ['6', '12', '18'],
              }
            }
          />
          <Modal
            visible={this.state.visible}
            title={<Text>辞退<Text type='danger'>{this.state.delName}</Text></Text>}
            okText='确定辞退'
            cancelText='取消'
            onOk={this.delListOK}
            onCancel={this.cancelNO}
            confirmLoading={this.state.confirmLoading}
          >
          </Modal>
        </Card>
    )
  }
}
