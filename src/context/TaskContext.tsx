import { ReactNode, createContext, useReducer, useState } from "react";
import { NewTaskProps } from "../pages/Home";
import { TaskReducers } from "../reducers/Tasks";
import {
  creatNewTaskAction,
  markCurrentTaskAsFinishedAction,
  stopCurrentTaskAction,
} from "../reducers/Tasks/actions";

type TaskProps = {
  task: string;
  minutesAmount: number;
};

export type TaskContextTypes = {
  arrayTasks: NewTaskProps[];
  activeTask: NewTaskProps | undefined;
  activeTaskID: string | null;
  markCurrentTaskAsFinished: () => void;
  secondsPassed: number;
  setAmountSecondsPassed: (seconds: number) => void;
  createNewTask: (data: TaskProps) => void;
  stopCurrentTask: () => void;
};

type ChildrenReactNode = {
  children: ReactNode;
};

export const TaskContext = createContext({} as TaskContextTypes);

export function TaskContextProvider({ children }: ChildrenReactNode) {
  const [tasksState, dispatch] = useReducer(TaskReducers, {
    arrayTasks: [],
    activeTaskID: null,
  });

  const [secondsPassed, setSecondsPassed] = useState(0);
  const { arrayTasks, activeTaskID } = tasksState;

  function createNewTask(data: TaskProps) {
    const newTask: NewTaskProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(creatNewTaskAction(newTask));
    setSecondsPassed(0);
  }

  function stopCurrentTask() {
    dispatch(stopCurrentTaskAction());
  }

  function markCurrentTaskAsFinished() {
    dispatch(markCurrentTaskAsFinishedAction());
  }

  function setAmountSecondsPassed(seconds: number) {
    setSecondsPassed(seconds);
  }

  const activeTask = arrayTasks.find((task) => task.id === activeTaskID);

  return (
    <TaskContext.Provider
      value={{
        arrayTasks,
        activeTask,
        activeTaskID,
        markCurrentTaskAsFinished,
        secondsPassed,
        setAmountSecondsPassed,
        createNewTask,
        stopCurrentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
