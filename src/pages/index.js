import React from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>加载中...</div>

// 首页
const Home = Loadable({
  loader:()=> import('./Home'),
  loading:loading
})
// 文章管理
const Article = Loadable({
  loader:()=> import('./Article'),
  loading:loading
})
// 书籍管理
const Book = Loadable({
  loader: ()=> import('./Book'),
  loading:loading
})
// 人员管理
const Personnel = Loadable({
  loader: ()=> import('./Personnel'),
  loading:loading
})
// 人员编辑
const PersonnelEdit = Loadable({
  loader: ()=> import('./Personnel/edit'),
  loading:loading
})
// 404
const FZF = Loadable({
  loader: ()=> import('./FZF'),
  loading:loading
})
// 消息中心
const Message = Loadable({
  loader: ()=> import('./Message'),
  loading:loading
})
// 消息查看
const MessageEditor = Loadable({
  loader: ()=> import('./Message/editor'),
  loading:loading
})
// 登录
const Login = Loadable({
  title:'登录',
  loader: ()=> import('./Login'),
  loading:loading
})
// 权限页面
const Permission = Loadable({
  title:'权限',
  loader: ()=> import('./Permission'),
  loading:loading
})


export{
  Home,
  Article,
  Book,
  Personnel,
  FZF,
  PersonnelEdit,
  Message,
  MessageEditor,
  Login,
  Permission,
}
