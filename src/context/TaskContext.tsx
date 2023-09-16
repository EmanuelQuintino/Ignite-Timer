import { ReactNode, createContext, useReducer, useState } from "react";
import { NewTaskProps } from "../pages/Home";

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

type TaskState = {
  arrayTasks: NewTaskProps[];
  activeTaskID: string | null;
};

export const TaskContext = createContext({} as TaskContextTypes);

export function TaskContextProvider({ children }: ChildrenReactNode) {
  const [tasksState, dispatch] = useReducer(
    (state: TaskState, action: any) => {
      switch (action.type) {
        case "CREATE_NEW_TASK":
          return {
            ...state,
            activeTaskID: action.payload.newTask.id,
            arrayTasks: [...state.arrayTasks, action.payload.newTask],
          };
        case "STOP_CURRENT_TASK":
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
        case "MARK_CURRENT_TASK_AS_FINISHED":
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
    },
    {
      arrayTasks: [],
      activeTaskID: null,
    }
  );

  const [secondsPassed, setSecondsPassed] = useState(0);
  const { arrayTasks, activeTaskID } = tasksState;

  function createNewTask(data: TaskProps) {
    const newTask: NewTaskProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: "CREATE_NEW_TASK",
      payload: {
        newTask,
      },
    });

    setSecondsPassed(0);
  }

  function stopCurrentTask() {
    dispatch({
      type: "STOP_CURRENT_TASK",
      payload: {
        activeTaskID,
      },
    });
  }

  function markCurrentTaskAsFinished() {
    dispatch({
      type: "MARK_CURRENT_TASK_AS_FINISHED",
      payload: {
        activeTaskID,
      },
    });
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
