import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  return (
    <CountdownContainer>
      <span>{amountMinutes[0]}</span>
      <span>{amountMinutes[1]}</span>

      <Separator>:</Separator>

      <span>{amountSeconds[0]}</span>
      <span>{amountSeconds[1]}</span>
    </CountdownContainer>
  );
}
