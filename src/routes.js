import {
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
} from './pages'

const routes = [
  {
    isNav: true,
    title: '首页',
    component: Home,
    path: '/admin/home',
    exact: true
  },{
    isNav: true,
    title: '文章管理',
    component: Article,
    path: '/admin/article',
    exact: true
  }, {
    isNav: true,
    title: '书籍管理',
    component: Book,
    path: '/admin/book',
    exact: true
  }, {
    isNav: true,
    title: '人员管理',
    component: Personnel,
    path: '/admin/personnel',
    exact: true,
    isPms: true,
  }, {
    isNav: false,
    title: '人员管理编辑',
    component: PersonnelEdit,
    path: '/admin/personnel/edit/:id',
    isPms: true,
  }, {
    isNav: false,
    title: '消息中心',
    component: Message,
    path: '/admin/message',
    exact: true
  }, {
    isNav: false,
    title: '消息内容',
    component: MessageEditor,
    path: '/admin/message/editor/:id',
  }, {
    component: FZF,
    path: '/notfound'
  }, {
    component: Login,
    path: '/login'
  }, {
    component: Permission,
    path: '/admin/permission'
  }]

export default routes
