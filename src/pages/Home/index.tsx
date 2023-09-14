import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style";
import { HandPalm, Play } from "phosphor-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { NewTaskForm } from "./components/NewTaskForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

export type NewTaskProps = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
};

const formSchemaValidation = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "Mínimo de tempo é 5 minutos")
    .max(60, "Máximo de tempo é 60 minutos"),
});

type TaskProps = zod.infer<typeof formSchemaValidation>;

export function Home() {
  const { activeTask, createNewTask, stopCurrentTask } = useContext(TaskContext);

  const newTaskForm = useForm<TaskProps>({
    resolver: zodResolver(formSchemaValidation),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newTaskForm;

  function handleCreateNewTask(data: TaskProps) {
    createNewTask(data);
    reset();
  }

  const taskValue = watch("task");
  const minutesAmountValue = watch("minutesAmount");
  const isSubmitDisable = !taskValue || !minutesAmountValue;

  return (
    <HomeContainer>
      <form id="formTask" onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>

        <Countdown />

        {activeTask ? (
          <StopCountdownButton type="button" onClick={stopCurrentTask}>
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
