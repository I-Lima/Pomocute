import { CHANGE_COLOR } from "../Constants/Reducer"

const INITIAL_STATE = {
  color: 'y'
}

const colorReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.payload.value
      }
    default:
      return state;
  }
}

export default colorReducer;
