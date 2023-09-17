import { NewTaskProps } from "../../pages/Home";
import { ActionTypes } from "./actions";
import { produce } from "immer";
import { TaskAction } from "./actions";

type TaskState = {
  arrayTasks: NewTaskProps[];
  activeTaskID: string | null;
};

export function TaskReducers(state: TaskState, action: TaskAction) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_TASK:
      return produce(state, (draft) => {
        draft.arrayTasks.push(action.payload.newTask);
        draft.activeTaskID = action.payload.newTask.id;
      });
    case ActionTypes.STOP_CURRENT_TASK: {
      const currentTaskIndex = state.arrayTasks.findIndex(
        (task) => task.id === state.activeTaskID
      );

      if (currentTaskIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeTaskID = null;
        draft.arrayTasks[currentTaskIndex].stopDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_TASK_AS_FINISHED: {
      const currentTaskIndex = state.arrayTasks.findIndex(
        (task) => task.id === state.activeTaskID
      );

      if (currentTaskIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeTaskID = null;
        draft.arrayTasks[currentTaskIndex].finishDate = new Date();
      });
    }
    default:
      return state;
  }
}
