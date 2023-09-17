import { NewTaskProps } from "../../pages/Home";

export enum ActionTypes {
  CREATE_NEW_TASK = "CREATE_NEW_TASK",
  STOP_CURRENT_TASK = "STOP_CURRENT_TASK",
  MARK_CURRENT_TASK_AS_FINISHED = "MARK_CURRENT_TASK_AS_FINISHED",
}

export function creatNewTaskAction(newTask: NewTaskProps) {
  return {
    type: ActionTypes.CREATE_NEW_TASK,
    payload: {
      newTask,
    },
  };
}

export function stopCurrentTaskAction() {
  return {
    type: ActionTypes.STOP_CURRENT_TASK,
  };
}

export function markCurrentTaskAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED,
  };
}
