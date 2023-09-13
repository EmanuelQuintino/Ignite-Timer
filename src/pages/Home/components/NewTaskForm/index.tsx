import { FormContainer, InputMinutesAmount, InputTask } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const formSchemaValidation = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "Mínimo de tempo é 5 minutos")
    .max(60, "Máximo de tempo é 60 minutos"),
});

type TaskProps = zod.infer<typeof formSchemaValidation>;

export function NewTaskForm() {
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
  return (
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
  );
}
