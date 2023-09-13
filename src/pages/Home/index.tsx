import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style";
import { NewTaskForm } from "./components/NewTaskForm";
import { Countdown } from "./components/Countdown";

const formSchemaValidation = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "Mínimo de tempo é 5 minutos")
    .max(60, "Máximo de tempo é 60 minutos"),
});

type TaskProps = zod.infer<typeof formSchemaValidation>;

type NewTaskProps = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
};

export function Home() {
  const [arrayTasks, setArrayTasks] = useState<NewTaskProps[]>([]);
  const [activeTaskID, setActiveTaskID] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TaskProps>({
    resolver: zodResolver(formSchemaValidation),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

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

  const taskValue = watch("task");
  const minutesAmountValue = watch("minutesAmount");
  const isSubmitDisable = !taskValue || !minutesAmountValue;

  const activeTask = arrayTasks.find((task) => task.id === activeTaskID);

  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
  const currentSeconds = activeTask ? totalSeconds - secondsPassed : 0;
  const amountMinutes = String(Math.floor(currentSeconds / 60)).padStart(2, "0");
  const amountSeconds = String(currentSeconds % 60).padStart(2, "0");

  useEffect(() => {
    function handleFinishTask() {
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

    let intervalID: number;

    if (activeTask) {
      intervalID = setInterval(() => {
        const secondsDiferrence = differenceInSeconds(new Date(), activeTask.startDate);

        if (secondsDiferrence > totalSeconds) {
          handleFinishTask();
        } else {
          setSecondsPassed(secondsDiferrence);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [activeTask, totalSeconds, activeTaskID]);

  return (
    <HomeContainer>
      <form id="formTask" onSubmit={handleSubmit(handleSubmitNewTask)}>
        <NewTaskForm />

        <Countdown />

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
