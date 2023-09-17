import { NewTaskProps } from "../../pages/Home";

export enum ActionTypes {
  CREATE_NEW_TASK = "CREATE_NEW_TASK",
  STOP_CURRENT_TASK = "STOP_CURRENT_TASK",
  MARK_CURRENT_TASK_AS_FINISHED = "MARK_CURRENT_TASK_AS_FINISHED",
}

type CreateNewTaskAction = {
  type: ActionTypes.CREATE_NEW_TASK;
  payload: {
    newTask: NewTaskProps;
  };
};

type StopCurrentTaskAction = {
  type: ActionTypes.STOP_CURRENT_TASK;
};

type MarkCurrentTaskAsFinishedAction = {
  type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED;
};

export type TaskAction =
  | CreateNewTaskAction
  | StopCurrentTaskAction
  | MarkCurrentTaskAsFinishedAction;

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
