import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import App from './App'
import { FZF, Login } from './pages';
import { connect } from 'react-redux'

const ComponentRoute = (props) =>(
  <Router>
    <Switch>
      <Route
        path='/admin'
        render={(appProps) => {
          if(props.haslogin === true) {
            return <App {...appProps}/>
          } else {
            return <Redirect to='/login' />
          }
        }}
      />
      <Route
        path='/notfound'
        component={FZF}
      />
      <Route
        path='/login'
        component={Login}
      />
      <Redirect to='/admin' from='/' exact />
      <Redirect to='/notfound' />
    </Switch>
  </Router>
)
export default connect(state => ({
   haslogin:state.user.haslogin
}))(ComponentRoute)
