import Mgactions from '../Mgactions'

import { userLogin } from '../requests'

export const changeUserName = () => {
  return{
    type: Mgactions.CHANGE_USER_NAME
  }
}
// 登录
const loginStart = () => {
  return {
    type: Mgactions.GET_USER_INFO,
  }
}
const loginSuccess = (userInfo) => {
  return {
    type: Mgactions.GET_USER_INFO_SUCCESS,
    payload: {
      userInfo
    }
  }
}
export const getUserInfo = (params) => {
  return (dispatch) => {
    dispatch(loginStart())
    userLogin(params)
      .then(resq => {
        if (resq.data.code === 200) {
          dispatch(loginSuccess(resq.data.data))
        } else {
          alert('登录失败')
        }
      })
      .catch(resq => {
        // console.log(resq.isOk)
      })
  }
}



// 获取登录用户信息 未使用
export const getUserInfoLogin = () => {
  return {
    type: Mgactions.GET_USER_INFO_LOGIN
  }
}

export const logout = () => {
  return {
    type: Mgactions.LOGOUT
  }
}
