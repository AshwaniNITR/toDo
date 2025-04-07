export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task
});

export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: id
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id
});