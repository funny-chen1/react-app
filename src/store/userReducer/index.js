import { SET_USER, PLAY_MUSIC } from '../actions/ActionType';

const initialState = {
  userInfo: '',
  currentUrl: ''
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, userInfo: action.payload};
    case PLAY_MUSIC:
      return {...state, currentUrl: action.payload};
    default:
      return state;
      break;
  }
}


export default Reducer;
