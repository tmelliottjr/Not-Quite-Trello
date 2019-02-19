import {
  CREATE_TASK,
  DELETE_TASK,
  MOVE_TASK,
  SAVE_TASK,
  EDIT_COLUMN,
  ADD_COLUMN,
  MOVE_COLUMN,
  DELETE_COLUMN,
} from '../actions';

const saveTask = (prevTasks, action) => {
  const { id, content } = action.task;
  let newTasks = {
    ...prevTasks,
    [id]: {
      ...prevTasks[id],
      content,
    },
  };
  return newTasks;
};

const createTask = (prevTasks, action) => {
  const { taskId, taskContent } = action;

  const newTasks = {
    ...prevTasks,
    [taskId]: {
      id: taskId,
      content: taskContent,
    },
  };

  return newTasks;
};

const addTaskToColumn = (prevColumns, action) => {
  const { taskId, columnId } = action;
  let newTaskIds = [...prevColumns[columnId].taskIds];
  newTaskIds.push(taskId);

  const newColumns = {
    ...prevColumns,
    [columnId]: {
      ...prevColumns[columnId],
      taskIds: newTaskIds,
    },
  };

  return newColumns;
};

const deleteTask = (prevTasks, action) => {
  const { taskId } = action;
  let newTasks = { ...prevTasks };

  delete prevTasks[taskId];

  return newTasks;
};

const removeTaskFromColumn = (prevColumns, action) => {
  const { taskId, columnId } = action;
  let newColumn = { ...prevColumns[columnId] };
  let newTaskIds = newColumn.taskIds;

  newTaskIds.splice(newTaskIds.indexOf(taskId), 1);
  newColumn.taskIds = newTaskIds;

  let newColumns = {
    ...prevColumns,
    [columnId]: newColumn,
  };

  return newColumns;
};

const moveTask = (prevColumns, action) => {
  const { destination, source, draggableId } = action.result;

  let sourceColumn = prevColumns[source.droppableId];
  let destinationColumn = prevColumns[destination.droppableId];

  // Move task to new position in same column
  if (sourceColumn === destinationColumn) {
    const newTaskIds = [...sourceColumn.taskIds];

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    let column = { ...sourceColumn, taskIds: newTaskIds };

    const newColumns = {
      ...prevColumns,
      [column.id]: column,
    };

    return newColumns;
  }

  // Remove task from original column
  const sourceTaskIds = [...sourceColumn.taskIds];
  sourceTaskIds.splice(source.index, 1);
  const newSourceColumn = { ...sourceColumn, taskIds: sourceTaskIds };

  // Insert task into new column
  const destinationTaskIds = [...destinationColumn.taskIds];
  destinationTaskIds.splice(destination.index, 0, draggableId);
  const newDestinationColumn = {
    ...destinationColumn,
    taskIds: destinationTaskIds,
  };

  const newColumns = {
    ...prevColumns,
    [newSourceColumn.id]: newSourceColumn,
    [newDestinationColumn.id]: newDestinationColumn,
  };

  return newColumns;
};

const addColumn = (prevColumns, action) => {
  const { columnId } = action;

  let newColumns = {
    ...prevColumns,
    [columnId]: {
      id: columnId,
      title: '',
      taskIds: [],
      new: true,
    },
  };

  return newColumns;
};

const addColumnToColumnOrder = (prevColumnOrder, action) => {
  const { columnId } = action;
  let newColumnOrder = [...prevColumnOrder];

  newColumnOrder.push(columnId);

  return newColumnOrder;
};

const moveColumn = (prevColumnOrder, action) => {
  const { destination, source, draggableId } = action.result;
  let newColumnOrder = [...prevColumnOrder];

  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);

  return newColumnOrder;
};

const deleteColumn = (prevColumns, action) => {
  const { columnId } = action;
  let newColumns = { ...prevColumns };

  delete newColumns[columnId];

  return newColumns;
};

const deleteAssociatedTasks = (prevTasks, action, prevColumns) => {
  const { columnId } = action;
  const newTasks = { ...prevTasks };

  prevColumns[columnId].taskIds.forEach(taskId => {
    delete newTasks[taskId];
  });

  return newTasks;
};

const removeColumnFromColumnOrder = (prevColumnOrder, action) => {
  const { columnId } = action;

  let newColumnOrder = [...prevColumnOrder];
  let columnIndex = newColumnOrder.indexOf(columnId);
  newColumnOrder.splice(columnIndex, 1);

  return newColumnOrder;
};

const editColumn = (prevColumns, action) => {
  const { columnId, columnTitle } = action;

  // refactor this - not sure we need to keep 'new' status in column's state
  const newColumns = {
    ...prevColumns,
    [columnId]: {
      ...prevColumns[columnId],
      title: columnTitle,
      new: false,
    },
  };

  return newColumns;
};

export const combinedReducer = (state, action) => {
  switch (action.type) {
    case SAVE_TASK:
      return {
        ...state,
        tasks: saveTask(state.tasks, action),
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: createTask(state.tasks, action),
        columns: addTaskToColumn(state.columns, action),
      };
    case MOVE_TASK:
      return {
        ...state,
        columns: moveTask(state.columns, action),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: deleteTask(state.tasks, action),
        columns: removeTaskFromColumn(state.columns, action),
      };
    case ADD_COLUMN:
      return {
        ...state,
        columns: addColumn(state.columns, action),
        columnOrder: addColumnToColumnOrder(state.columnOrder, action),
        addedColumn: action.columnId,
      };
    case MOVE_COLUMN:
      return {
        ...state,
        columnOrder: moveColumn(state.columnOrder, action),
      };
    case DELETE_COLUMN:
      return {
        ...state,
        tasks: deleteAssociatedTasks(state.tasks, action, state.columns),
        columns: deleteColumn(state.columns, action),
        columnOrder: removeColumnFromColumnOrder(state.columnOrder, action),
        addedColumn: null,
      };
    case EDIT_COLUMN:
      return {
        ...state,
        columns: editColumn(state.columns, action),
        addedColumn: null,
      };
    default:
      return state;
  }
};
