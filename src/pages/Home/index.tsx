import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  InputMinutesAmount,
  InputTask,
  Separator,
  StartCountdownButton,
} from "./style";

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function handleSubmitNewTask(data) {
    console.log(data);
  }

  const taskValue = watch("task");
  const minutesAmountValue = watch("minutesAmount");
  const isSubmitDisable = !taskValue || !minutesAmountValue;

  return (
    <HomeContainer>
      <form id="formTask" onSubmit={handleSubmit(handleSubmitNewTask)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <InputTask
            type="text"
            id="task"
            placeholder="Diga qual tarefa a ser realizada"
            list="taskSuggestion"
            {...register("task")}
          />

          <datalist id="taskSuggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <InputMinutesAmount
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={5}
            max={60}
            step={5}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton
          type="submit"
          form="formTask"
          disabled={isSubmitDisable}
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
