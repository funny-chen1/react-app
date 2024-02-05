// store.js
import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer/index";
const rootReducer = combineReducers({
  user: userReducer,
  // other reducers...
});
const store = createStore(rootReducer);

export default store;
