import Mgactions from '../Mgactions'

import { getMesssage,getAllReadMesssage } from '../requests'

export const changeReadMessage = (id) => {
  // console.log(id)
  return{
    type:Mgactions.CHANGE_READ_MESSAGE,
    payload:{
      id
    }
  }
}

const setMessage = (dataMessage) => {
  return {
    type: Mgactions.SET_MESSAGE,
    payload: {
      dataMessage
    }
  }
}

export const getMessageActions = () => {
  return dispatch => {
    getMesssage()
     .then(resq => {
       if(resq.data.code === 200) {
         dispatch(setMessage(resq.data.data))
       }
     })
  }
}

export const changeAllMessage = () => {
  return dispatch => {
    getAllReadMesssage()
     .then(resq => {
       if(resq.data.code === 200) {
         dispatch(setMessage(resq.data.data))
       }
     })
  }
}
