import { ReactNode, createContext, useState } from "react";
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

export const TaskContext = createContext({} as TaskContextTypes);

export function TaskContextProvider({ children }: ChildrenReactNode) {
  const [arrayTasks, setArrayTasks] = useState<NewTaskProps[]>([]);
  const [activeTaskID, setActiveTaskID] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  function createNewTask(data: TaskProps) {
    const newTask: NewTaskProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setArrayTasks((prevState) => [...prevState, newTask]);
    setActiveTaskID(newTask.id);
    setSecondsPassed(0);
  }

  function stopCurrentTask() {
    setArrayTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === activeTaskID) {
          return { ...task, stopDate: new Date() };
        } else {
          return task;
        }
      })
    );
    setActiveTaskID(null);
  }

  function markCurrentTaskAsFinished() {
    setArrayTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === activeTaskID) {
          return { ...task, finishDate: new Date() };
        } else {
          return task;
        }
      })
    );
    setActiveTaskID(null);
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
