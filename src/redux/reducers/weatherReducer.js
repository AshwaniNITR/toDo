import {
    FETCH_WEATHER_START,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
  } from '../actions/weatherActions';
  
  const initialState = {};
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WEATHER_START:
        return {
          ...state,
          [action.payload.taskId]: {
            loading: true,
            error: null,
            data: null
          }
        };
        
      case FETCH_WEATHER_SUCCESS:
        return {
          ...state,
          [action.payload.taskId]: {
            loading: false,
            error: null,
            data: action.payload.data
          }
        };
        
      case FETCH_WEATHER_FAILURE:
        return {
          ...state,
          [action.payload.taskId]: {
            loading: false,
            error: action.payload.error,
            data: null
          }
        };
        
      default:
        return state;
    }
  };
  
  export default weatherReducer;