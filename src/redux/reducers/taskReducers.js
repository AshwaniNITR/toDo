import { ADD_TASK, TOGGLE_TASK, DELETE_TASK } from '../actions/taskActions';

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
      
    case TOGGLE_TASK:
      return state.map(task => 
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      
    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload);
      
    default:
      return state;
  }
};

export default taskReducer;