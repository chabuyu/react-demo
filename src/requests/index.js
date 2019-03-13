import axios from 'axios'

const ajax = axios.create({
  //TODO:路由
  baseURL:"http://rap2api.taobao.org/app/mock/161031"
})
// 请求人员管理数据
export const getArticleList=() =>{
  return ajax.post('/api/v1/personnel/list')
}
// 删除个人信息
export const getArticleDel=(id) =>{
  return ajax.post(`/api/v1/personnel/list/del/${id}`)
}
// 人员管理个人信息编辑
export const getArticleEdit=(id) =>{
  return ajax.post(`/api/v1/personnel/list/edit/${id}`)
}
// 仪表盘月份数据请求
export const getArticle=(month) =>{
  return ajax.post(`/api/v1/article/p1/${month}`)
}
// 消息中心 消息请求
export const getMesssage=() =>{
  return ajax.post('/api/v1/message')
}
// 消息中心 阅读
export const getMesssageEditor=(id) =>{
  return ajax.post(`/api/v1/message/editor`,id)
}
// 消息中心 所有已读阅读
export const getAllReadMesssage=() =>{
  return ajax.post('/api/v1/message/allread')
}
// 登录
export const userLogin=() =>{
  return ajax.post('/api/v1/user/login')
}
