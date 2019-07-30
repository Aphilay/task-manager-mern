// This file combines all the relevant reducers. If another reducer was created, it would need to be added here.
// This file is also known as the rootReducer
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});
