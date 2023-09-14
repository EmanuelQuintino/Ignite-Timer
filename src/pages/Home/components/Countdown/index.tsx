import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { TaskContext } from "../../../../context/TaskContext";

export function Countdown() {
  const {
    activeTask,
    activeTaskID,
    markCurrentTaskAsFinished,
    secondsPassed,
    setAmountSecondsPassed,
  } = useContext(TaskContext);
  
  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;

  const currentSeconds = activeTask ? totalSeconds - secondsPassed : 0;
  const amountMinutes = String(Math.floor(currentSeconds / 60)).padStart(2, "0");
  const amountSeconds = String(currentSeconds % 60).padStart(2, "0");

  useEffect(() => {
    let intervalID: number;

    if (activeTask) {
      intervalID = setInterval(() => {
        const secondsDiferrence = differenceInSeconds(new Date(), activeTask.startDate);

        if (secondsDiferrence > totalSeconds) {
          markCurrentTaskAsFinished();
        } else {
          setAmountSecondsPassed(secondsDiferrence);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [
    activeTask,
    totalSeconds,
    activeTaskID,
    markCurrentTaskAsFinished,
    setAmountSecondsPassed,
  ]);

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
