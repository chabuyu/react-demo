import React, { Component, createRef } from 'react'

import {
  Button,
  Row,
  Col,
  Card
} from 'antd'

import echarts from 'echarts'
import { getArticle } from "../../requests";

export default class Article extends Component {
  constructor() {
    super()
    this.state = {
      moment: 6,
      month: '',
      sales: '',
      dataType: 'line'
    }
    this.articleRef = createRef()
  }

  option = () => {

  }

  change = (dataType) => {
    this.setState({
      dataType
    }, () => {
      this.getArticleAjax()
    })
  }
  // ajax 请求
  getArticleAjax = () => {
    getArticle(this.state.moment)
      .then(resq => {
        if (resq.data.code === 200) {
          const month = resq.data.data.map(curr => curr.month)
          const sales = resq.data.data.map(curr => curr.sales)
          this.setState({
            month,
            sales
          }, () => {
            this.myChart = echarts.init(this.createDom);
            this.myChart.setOption({
              title: {
                text: '近三月手机销量'
              },
              tooltip: {},
              legend: {
                month: ['销量']
              },
              xAxis: {
                data: this.state.month
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: this.state.dataType,
                data: this.state.sales
              }]
            })
          })
        }
      })
  }
  changeMoment = (moment) => {
    this.setState({
      moment
    },() => {
      this.getArticleAjax()
    })
  }
  componentDidMount() {
    this.createDom = this.articleRef.current
    this.getArticleAjax()
  }

  render() {
    return (
      <Card title='仪表盘' style={{ margin:8 }}>
        <Row>
          <Col span={12} style={{ margin:8 }}>
            <div
              ref={this.articleRef}
              style={{ height: 400 }}
            />
            <Button type={this.state.moment === 3 ? "primary" : 'default'}
            size='small' onClick={this.changeMoment.bind(this, 3)}>近三月</Button>
            <Button type={this.state.moment ===  6 ? "primary" : 'default'}
            size='small' onClick={this.changeMoment.bind(this, 6)} style={{ margin: 15 }}>近六月</Button>
            <Button type={this.state.moment ===  12 ? "primary" : 'default'}
            size='small' onClick={this.changeMoment.bind(this, 12)} >近十二月</Button>
            <Button type={this.state.dataType === 'bar' ? "primary" : 'default'}
            size='small' onClick={this.change.bind(this, 'bar')} style={{ margin: 15 }}>柱状图</Button>
            <Button type={this.state.dataType === 'line' ? "primary" : 'default'}
            size='small' onClick={this.change.bind(this, 'line')}>折线图</Button>
            <Button type={this.state.dataType === 'scatter' ? "primary" : 'default'}
            size='small' onClick={this.change.bind(this, 'scatter')} style={{ margin: 15 }}>点图</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}
