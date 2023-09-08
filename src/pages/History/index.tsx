import { BoxStatus, HistoryContainer, HistoryList } from "./style";

export function History() {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <BoxStatus statusColor="green">Concluída</BoxStatus>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <BoxStatus statusColor="yellow">Em andamento</BoxStatus>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <BoxStatus statusColor="red">Interrompido</BoxStatus>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <BoxStatus statusColor="green">Concluída</BoxStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
