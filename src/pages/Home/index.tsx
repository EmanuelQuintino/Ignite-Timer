import { Play } from "phosphor-react";
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
  return (
    <HomeContainer>
      <form id="formTask">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <InputTask
            type="text"
            id="task"
            placeholder="Diga qual tarefa a ser realizada"
            list="taskSuggestion"
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

        <StartCountdownButton type="submit" form="formTask">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
