import { HandPalm, Play } from "phosphor-react";
import { useState, useEffect, createContext } from "react";
import { differenceInSeconds } from "date-fns";

import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style";
import { NewTaskForm } from "./components/NewTaskForm";
import { Countdown } from "./components/Countdown";

type NewTaskProps = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
};

type TaskContextTypes = {
  activeTask: NewTaskProps | undefined;
  activeTaskID: string | null;
  markCurrentTaskAsFinished: () => void;
};

export const TaskContext = createContext({} as TaskContextTypes);

export function Home() {
  const [arrayTasks, setArrayTasks] = useState<NewTaskProps[]>([]);
  const [activeTaskID, setActiveTaskID] = useState<string | null>(null);

  function handleSubmitNewTask(data: TaskProps) {
    const newTask: NewTaskProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setArrayTasks((prevState) => [...prevState, newTask]);
    setActiveTaskID(newTask.id);
    setSecondsPassed(0);
    reset();
  }

  function handleStopTask() {
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

  const taskValue = watch("task");
  const minutesAmountValue = watch("minutesAmount");
  const isSubmitDisable = !taskValue || !minutesAmountValue;

  const activeTask = arrayTasks.find((task) => task.id === activeTaskID);

  return (
    <HomeContainer>
      <form id="formTask" onSubmit={handleSubmit(handleSubmitNewTask)}>
        <TaskContext.Provider
          value={{ activeTask, activeTaskID, markCurrentTaskAsFinished }}
        >
          <NewTaskForm />

          <Countdown />
        </TaskContext.Provider>

        {activeTask ? (
          <StopCountdownButton type="button" onClick={handleStopTask}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" form="formTask" disabled={isSubmitDisable}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
