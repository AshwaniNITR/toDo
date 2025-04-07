import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import taskReducer from './reducers/taskReducers';
import weatherReducer from './reducers/weatherReducer';
import authReducer from './reducers/authslice';

const rootReducer = combineReducers({
  tasks: taskReducer,
  weather: weatherReducer,
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);