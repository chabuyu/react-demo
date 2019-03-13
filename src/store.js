import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers'
// 创建一个store  需传入合并后的rootReducers
export default createStore(
  rootReducers,
  applyMiddleware(
    thunk
  )
)
