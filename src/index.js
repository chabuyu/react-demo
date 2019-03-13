import React from 'react'
import { render } from 'react-dom'
import { LocaleProvider, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import './style/index.less'
import ComponentRoute from './componentRoute'
import { Provider } from 'react-redux'
import store from './store'
render(
  <Provider store={store}>
    <ConfigProvider>
      <LocaleProvider locale={zh_CN}>
        <ComponentRoute />
      </LocaleProvider>
    </ConfigProvider>
  </Provider>,
  document.querySelector('#root')
)
