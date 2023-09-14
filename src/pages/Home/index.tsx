import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style";
import { HandPalm, Play } from "phosphor-react";
import { useState, createContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
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
  secondsPassed: number;
  setAmountSecondsPassed: (seconds: number) => void;
};

export const TaskContext = createContext({} as TaskContextTypes);

export function Home() {
  const [arrayTasks, setArrayTasks] = useState<NewTaskProps[]>([]);
  const [activeTaskID, setActiveTaskID] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const formSchemaValidation = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
      .number()
      .min(5, "Mínimo de tempo é 5 minutos")
      .max(60, "Máximo de tempo é 60 minutos"),
  });

  type TaskProps = zod.infer<typeof formSchemaValidation>;

  const newTaskForm = useForm<TaskProps>({
    resolver: zodResolver(formSchemaValidation),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newTaskForm;

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

  function setAmountSecondsPassed(seconds: number) {
    setSecondsPassed(seconds);
  }

  const taskValue = watch("task");
  const minutesAmountValue = watch("minutesAmount");
  const isSubmitDisable = !taskValue || !minutesAmountValue;

  const activeTask = arrayTasks.find((task) => task.id === activeTaskID);

  return (
    <HomeContainer>
      <form id="formTask" onSubmit={handleSubmit(handleSubmitNewTask)}>
        <TaskContext.Provider
          value={{
            activeTask,
            activeTaskID,
            markCurrentTaskAsFinished,
            secondsPassed,
            setAmountSecondsPassed,
          }}
        >
          <FormProvider {...newTaskForm}>
            <NewTaskForm />
          </FormProvider>

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
