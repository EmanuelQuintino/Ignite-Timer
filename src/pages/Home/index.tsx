import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  InputMinutesAmount,
  InputTask,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
} from "./style";

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
    setArrayTasks(
      arrayTasks.map((task) => {
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
    let intervalID: number;

    if (activeTask) {
      intervalID = setInterval(() => {
        setSecondsPassed(differenceInSeconds(new Date(), activeTask.startDate));
      }, 1000);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [activeTask]);

  return (
    <HomeContainer>
      <form id="formTask" onSubmit={handleSubmit(handleSubmitNewTask)}>
        <FormContainer>
          <section>
            <label htmlFor="task">Vou trabalhar em</label>
            <InputTask
              type="text"
              id="task"
              placeholder="Diga qual tarefa a ser realizada"
              list="taskSuggestion"
              disabled={!!activeTask}
              {...register("task")}
            />

            <datalist id="taskSuggestion">
              <option value="Projeto 1" />
              <option value="Projeto 2" />
              <option value="Projeto 3" />
              <option value="Projeto 4" />
            </datalist>

            {errors.task && (
              <span role="alert" className="inputError">
                {errors.task.message}
              </span>
            )}
          </section>

          <section>
            <label htmlFor="minutesAmount">durante</label>
            <InputMinutesAmount
              type="number"
              id="minutesAmount"
              placeholder="00"
              min={5}
              max={60}
              step={5}
              disabled={!!activeTask}
              {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutos.</span>

            {errors.minutesAmount && (
              <span role="alert" className="inputError">
                {errors.minutesAmount.message}
              </span>
            )}
          </section>
        </FormContainer>

        <CountdownContainer>
          <span>{amountMinutes[0]}</span>
          <span>{amountMinutes[1]}</span>

          <Separator>:</Separator>

          <span>{amountSeconds[0]}</span>
          <span>{amountSeconds[1]}</span>
        </CountdownContainer>

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
