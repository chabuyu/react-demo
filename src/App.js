import React, { Component } from 'react'
import { Common } from './components'
import { Route, Switch, Redirect } from 'react-router-dom'

import routes from './routes'// 导入路由

import { connect } from 'react-redux'
import { getMessageActions } from './actions/message'



const isNav = routes.filter(curr => curr.isNav === true)// 获取title
@connect(null, { getMessageActions })
export default class App extends Component {
  componentDidMount() {
    this.props.getMessageActions()
  }
  render() {
    return (
      <Common istitle={isNav}>
        <Switch>
          {
            routes.map(curr => {
              return (
                <Route
                  path={curr.path}
                  key={curr.path}
                  exact={curr.exact}
                  render={props => {
                    if (curr.isPms) {
                      return <Redirect to='/admin/permission' />
                    }
                    return <curr.component {...props}/>
                  }}
                />
              )
            })
          }
          <Redirect to='/admin/home' from='/admin' exact/>
        </Switch>
      </Common>
    )
  }
}
