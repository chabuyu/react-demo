import Mgactions from '../Mgactions'


const storageInfo = JSON.parse(window.localStorage.getItem('userInfo')) || {}
const initUser = Object.assign({}, {
  name: '',
  islogin: false,
  //改变haslogin 的状态来 改变 componentRoute里的 重定向
  haslogin: storageInfo.token ? true : false
}, storageInfo)

export default (state = initUser, action) => {
  switch (action.type) {
    // 开始登陆
    case Mgactions.GET_USER_INFO:
      return {
        ...state,
        islogin: true
      }
      // 登录成功
    case Mgactions.GET_USER_INFO_SUCCESS:
      const newState = {
        ...state,
        ...action.payload.userInfo,
        islogin: false,
        haslogin: true
      }
      window.localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo))
      return newState
      // 退出登录
    case Mgactions.LOGOUT:
      window.localStorage.removeItem('userInfo')
      window.location.reload()
      return{
        islogin: false,
        haslogin: false,
        ...state
      }
    default:
      return state
  }
}
