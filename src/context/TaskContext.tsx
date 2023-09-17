import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { NewTaskProps } from "../pages/Home";
import { TaskReducers } from "../reducers/Tasks";
import {
  creatNewTaskAction,
  markCurrentTaskAsFinishedAction,
  stopCurrentTaskAction,
} from "../reducers/Tasks/actions";
import { differenceInSeconds } from "date-fns";

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
  const [tasksState, dispatch] = useReducer(
    TaskReducers,
    {
      arrayTasks: [],
      activeTaskID: null,
    },
    (initialState) => {
      const storageState = localStorage.getItem("@ignite-timer:array-tasks-1.0.0");
      if (storageState) return JSON.parse(storageState);
      return initialState;
    }
  );

  const { arrayTasks, activeTaskID } = tasksState;
  const activeTask = arrayTasks.find((task) => task.id === activeTaskID);

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeTask) {
      return differenceInSeconds(new Date(), new Date(activeTask.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(tasksState);
    localStorage.setItem("@ignite-timer:array-tasks-1.0.0", stateJSON);
  }, [tasksState]);

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
