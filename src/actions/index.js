import { generateUID } from '../util';

export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const SAVE_TASK = 'SAVE_TASK';
export const EDIT_COLUMN = 'EDIT_COLUMN';
export const ADD_COLUMN = 'ADD_COLUMN';
export const MOVE_COLUMN = 'MOVE_COLUMN';
export const DELETE_COLUMN = 'DELETE_COLUMN';

export function createTask(columnId, taskContent) {
  return {
    type: CREATE_TASK,
    taskId: generateUID(),
    taskContent,
    columnId,
  };
}

export function deleteTask(taskId, columnId) {
  return {
    type: DELETE_TASK,
    taskId,
    columnId,
  };
}

export function moveTask(result) {
  return { type: MOVE_TASK, result };
}

export function saveTask(task) {
  return { type: SAVE_TASK, task };
}

export function editColumn(columnId, columnTitle) {
  return { type: EDIT_COLUMN, columnId, columnTitle };
}

export function addColumn() {
  return { type: ADD_COLUMN, columnId: generateUID() };
}

export function moveColumn(result) {
  return { type: MOVE_COLUMN, result };
}

export function deleteColumn(columnId) {
  return { type: DELETE_COLUMN, columnId };
}
