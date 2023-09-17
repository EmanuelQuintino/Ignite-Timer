import { NewTaskProps } from "../../pages/Home";
import { ActionTypes } from "./actions";

type TaskState = {
  arrayTasks: NewTaskProps[];
  activeTaskID: string | null;
};

export function TaskReducers(state: TaskState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_TASK:
      return {
        ...state,
        activeTaskID: action.payload.newTask.id,
        arrayTasks: [...state.arrayTasks, action.payload.newTask],
      };
    case ActionTypes.STOP_CURRENT_TASK:
      return {
        ...state,
        activeTaskID: null,
        arrayTasks: state.arrayTasks.map((task) => {
          if (task.id === state.activeTaskID) {
            return { ...task, stopDate: new Date() };
          } else {
            return task;
          }
        }),
      };
    case ActionTypes.MARK_CURRENT_TASK_AS_FINISHED:
      return {
        ...state,
        activeTaskID: null,
        arrayTasks: state.arrayTasks.map((task) => {
          if (task.id === state.activeTaskID) {
            return { ...task, finishDate: new Date() };
          } else {
            return task;
          }
        }),
      };
    default:
      return state;
  }
}
