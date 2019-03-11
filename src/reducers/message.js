import Mgactions from '../Mgactions'

const initMessage = {
  dataMessage: []
}
// console.log(this.state)
export default (state = initMessage, action) => {
  switch (action.type) {
    case Mgactions.CHANGE_READ_MESSAGE:
      const dataMessage = state.dataMessage.map(curr => {
        if (curr.id === action.payload.id) {
          // console.log(curr.id===action.payload.id)
          curr.isRead = true
        }
        return curr
      })
      return {
        ...state,
        dataMessage
      }
    case Mgactions.SET_MESSAGE:
      return {
        ...state,
        dataMessage: action.payload.dataMessage
      }
    case Mgactions.CHANGE_ALL_MESSAGE:
      return {
        ...state,
        dataMessage: action.payload.dataMessage
      }
    default:
      return state
  }
}
