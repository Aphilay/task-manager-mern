// Store holds the whole state tree of the application, see documentation for redux store
// The only way to change the state inside is to dispatch an action on it (e.g. addItem, removeItem, etc. )
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // Middleware
import rootReducer from "./reducers"; //index.js, don't have to specify because it's called index.js

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);
export default store;
