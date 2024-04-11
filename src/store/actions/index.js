import { SET_USER } from '../actions/ActionType'
import { PLAY_MUSIC } from '../actions/ActionType';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const playMusic = (url) => ({
  type: PLAY_MUSIC,
  payload: url,
});
