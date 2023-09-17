import { useContext } from "react";
import { BoxStatus, HistoryContainer, HistoryList } from "./style";
import { TaskContext } from "../../context/TaskContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function History() {
  const { arrayTasks } = useContext(TaskContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {arrayTasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(task.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {task.finishDate && (
                      <BoxStatus statusColor="green">Concluída</BoxStatus>
                    )}

                    {task.stopDate && (
                      <BoxStatus statusColor="red">Interrompida</BoxStatus>
                    )}

                    {!task.finishDate && !task.stopDate && (
                      <BoxStatus statusColor="yellow">Em andamento</BoxStatus>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
