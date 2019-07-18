import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

// 7/17: LEFT OFF TRYING TO CHANGE THIS CODE FROM YOUTUBE COMMENT. (TRY NEXT: FOLLOW REDUX EXTENSION PAGE)
// https://extension.remotedev.io/#usage

// const store = createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middleware),
//     //visit page for instructions, need this line to use redux/redux extension
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
// ));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);
export default store;